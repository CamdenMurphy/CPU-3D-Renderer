class Vertex3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    clone() {
        return new Vertex3D(this.x, this.y, this.z);
    }

    subtract(other) {
        return new Vertex3D(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    add(other) {
        return new Vertex3D(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    scale(factor) {
        return new Vertex3D(this.x * factor, this.y * factor, this.z * factor);
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    normalize() {
        let length = this.magnitude();
        return new Vertex3D(this.x / length, this.y / length, this.z / length);
    }

    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    cross(other) {
        let cx = this.y * other.z - this.z * other.y;
        let cy = this.z * other.x - this.x * other.z;
        let cz = this.x * other.y - this.y * other.x;
        return new Vertex3D(cx, cy, cz);
    }
}
