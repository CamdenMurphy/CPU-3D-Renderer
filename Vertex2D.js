class Vertex2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vertex2D(this.x, this.y);
    }

    subtract(other) {
        return new Vertex2D(this.x - other.x, this.y - other.y);
    }

    add(other) {
        return new Vertex2D(this.x + other.x, this.y + other.y);
    }

    scale(factor) {
        return new Vertex2D(this.x * factor, this.y * factor);
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize() {
        let length = this.magnitude();
        return new Vertex2D(this.x / length, this.y / length);
    }

    perpendicular() {
        return new Vertex2D(-this.y, this.x);
    }

    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
}
