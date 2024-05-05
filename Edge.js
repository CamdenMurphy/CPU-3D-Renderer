class Edge {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    calculateTangent() {
        return this.end.subtract(this.start);
    }

    getNormalizedTangent() {
        return this.calculateTangent().normalize();
    }

    calculatePerpendicular() {
        return this.getNormalizedTangent().perpendicular();
    }

    lineEquation() {
        let perpendicular = this.calculatePerpendicular();
        let dotProduct = perpendicular.dot(this.start);
        let constant = -dotProduct;
        return { A: perpendicular.x, B: perpendicular.y, C: constant };
    }

    generatePixels() {
        let pixels = [];
        let start = this.start;
        let end = this.end;
        let dx = Math.abs(end.x - start.x);
        let dy = Math.abs(end.y - start.y);
        let sx = (start.x < end.x) ? 1 : -1;
        let sy = (start.y < end.y) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            pixels.push(new Pixel(Math.round(start.x), Math.round(start.y), 255, 255, 255));
            if (start.x === end.x && start.y === end.y) break;
            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                start.x += sx;
            }
            if (e2 < dx) {
                err += dx;
                start.y += sy;
            }
        }

        return pixels;
    }
}
