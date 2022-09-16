export class Vec2d {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static randAngle(magnitude:number = 1): Vec2d {
        let angle = Math.random() * Math.PI * 2;
        return new Vec2d(Math.cos(angle)*magnitude, Math.sin(angle)*magnitude);
    }

    static rand2D(maxMagnitude:number = 1):Vec2d {
        return Vec2d.randAngle().mult(Math.random() * maxMagnitude);
    }

    static randBox(width:number, height:number = width):Vec2d {
        return new Vec2d(Math.random()*width, Math.random()*height);
    }

    copy():Vec2d {
        return new Vec2d(this.x, this.y);
    }

    set(other:Vec2d):Vec2d {
        this.x = other.x;
        this.y = other.y;
        return this; 
    }

    setXY(x:number, y:number):Vec2d {
        this.x = x;
        this.y = y;
        return this; 
    }

    add(other:Vec2d):Vec2d {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    sub(other:Vec2d):Vec2d {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    mult(num:number):Vec2d {
        this.x = this.x*num;
        this.y = this.y*num;
        return this;
    }

    div(num:number):Vec2d {
        this.x = this.x/num;
        this.y = this.y/num;
        return this;
    }

    addXY(x:number, y:number):Vec2d {
        this.x += x;
        this.y += y;
        return this;
    }

    subXY(x: number, y: number): Vec2d {
        this.x -= x;
        this.y -= y;
        return this;
    }

    sqMag(): number {
        return this.x**2 + this.y**2;
    }

    mag(): number {
        return Math.sqrt(this.sqMag());
    }

    dist(other: Vec2d): number {
        return this.copy().sub(other).mag();
    }

    setMag(newMag: number): Vec2d {
        let mag = this.mag();
        if (mag == 0) { // if no direction make up something random
            this.set(Vec2d.randAngle().mult(newMag));
            return this;
        }
        this.mult(newMag/this.mag());
        return this;
    }

    normalize(): Vec2d {
        this.setMag(1);
        return this;
    }

    floor(): Vec2d {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    round(): Vec2d {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    getAngle(): number {
        return Math.atan2(this.y, this.x);
    }

    setAngle(angle: number): Vec2d {
        let oldMag = this.mag();
        this.x = Math.cos(angle)*oldMag;
        this.y = Math.sin(angle)*oldMag;
        return this;
    }

    rotate(angle: number): Vec2d {
        this.setAngle(this.getAngle() + angle);
        return this;
    }

    dot(other: Vec2d): number {
        return this.x*other.x + this.y*other.y;
    }

    hasNaN(): boolean {
        return isNaN(this.x) || isNaN(this.y);
    }

    assertNaN(): void {
        if (this.hasNaN()) throw "found NaN";
    }

    isInRect(width: number, height: number, radius: number = 0): boolean {
        return (this.x > radius && this.y > radius && this.x < width-radius && this.y < height-radius);
    }

    putInRect(width: number, height: number, radius: number):Vec2d {
        if (this.x < radius) this.x = radius;
        if (this.y < radius) this.y = radius;
        if (this.x > width-radius) this.x = width-radius;
        if (this.y > height-radius) this.y = height-radius;
        return this;
    }
}