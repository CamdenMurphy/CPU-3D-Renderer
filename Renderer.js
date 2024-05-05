class Renderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.scaleFactor = this.canvas.width / 4;
        this.objData = obj;
        this.vertices = [];
        this.normals = [];
        this.uvs = [];
        this.triangles = [];
        this.zBuffer = [];
        this.tick = 0;
        this.useAnimation = true;
        this.initializeZBuffer();
        this.parseObjData();
        this.start();
    }

    initializeZBuffer() {
        for (let x = 0; x < this.canvas.width; x++) {
            this.zBuffer[x] = [];
            for (let y = 0; y < this.canvas.height; y++) {
                this.zBuffer[x][y] = new Pixel(x, y, 0, 0, 0, 1000);
            }
        }
    }

    parseObjData() {
        let lines = this.objData.split("\n");
        lines.forEach(line => {
            let parts = line.trim().split(" ");
            switch (parts[0]) {
                case 'v':
                    let vertex = new Vertex3D(
                        parseFloat(parts[1]) * this.scaleFactor + this.canvas.width / 2,
                        parseFloat(parts[2]) * this.scaleFactor + this.canvas.height / 2,
                        parseFloat(parts[3]) * this.scaleFactor
                    );
                    this.vertices.push(vertex);
                    break;
                case 'vn':
                    let normal = new Vertex3D(
                        parseFloat(parts[1]),
                        parseFloat(parts[2]),
                        parseFloat(parts[3])
                    );
                    this.normals.push(normal);
                    break;
                case 'vt':
                    let uv = new Vertex2D(
                        parseFloat(parts[1]),
                        parseFloat(parts[2])
                    );
                    this.uvs.push(uv);
                    break;
                case 'f':
                    let triangleVertices = parts.slice(1).map(index => {
                        let indices = index.split('/').map(idx => parseInt(idx, 10) - 1);
                        return this.vertices[indices[0]];
                    });
                    this.triangles.push(new Triangle(...triangleVertices));
                    break;
            }
        });
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.triangles.forEach(triangle => {
            let vertices = [triangle.vertexOne, triangle.vertexTwo, triangle.vertexThree];
            if (this.useAnimation) {
                vertices = vertices.map(vertex => this.rotate(vertex, this.tick / 100));
            }
            this.drawTriangle(vertices);
        });
        if (this.useAnimation) {
            this.tick++;
            requestAnimationFrame(this.render.bind(this));
        }
    }

    rotate(vertex, angle) {
        let centerX = this.canvas.width / 2;
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        let x = vertex.x - centerX;
        let z = vertex.z;
        let rotatedX = cos * x - sin * z + centerX;
        let rotatedZ = sin * x + cos * z;

        return new Vertex3D(rotatedX, vertex.y, rotatedZ);
    }

    drawTriangle(vertices) {
        vertices.sort((v1, v2) => v1.y - v2.y);

        let [v1, v2, v3] = vertices;
        let edges = [
            {from: v1, to: v2},
            {from: v2, to: v3},
            {from: v3, to: v1}
        ];

        edges.forEach(edge => {
            let {from, to} = edge;
            this.drawLine(from, to);
        });
        
        
    }

    drawLine(from, to) {
        let x0 = Math.round(from.x);
        let y0 = Math.round(from.y);
        let x1 = Math.round(to.x);
        let y1 = Math.round(to.y);
    
        let dx = Math.abs(x1 - x0);
        let dy = -Math.abs(y1 - y0);
        let sx = (x0 < x1) ? 1 : -1;
        let sy = (y0 < y1) ? 1 : -1;
        let err = dx + dy, e2;
    
        while (true) {
            this.setPixel(x0, y0, 255, 255, 255);
            if (x0 === x1 && y0 === y1) break;
            e2 = 2 * err;
            if (e2 >= dy) {
                err += dy;
                x0 += sx;
            }
            if (e2 <= dx) {
                err += dx;
                y0 += sy;
            }
        }
    }
    
    setPixel(x, y, r, g, b) {
        if (x >= 0 && x < this.canvas.width && y >= 0 && y < this.canvas.height) {
            this.ctx.fillStyle = `rgb(${r},${g},${b})`;
            this.ctx.fillRect(x, y, 1, 1);
        }
    }

    start() {
        if (this.useAnimation) {
            requestAnimationFrame(this.render.bind(this));
        } else {
            this.render();
        }
    }
}




const renderer = new Renderer('canvas'); 
renderer.start(); 