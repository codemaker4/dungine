import { DungineRoom } from "./dungineRoom.js";
import { Vec2d } from "./vec2d.js";

export class ParticleManager {
    dungineRoom: DungineRoom
    particles: Particle[]
    constructor(dungineRoom: DungineRoom) {
        this.dungineRoom = dungineRoom;
        this.particles = [];
    }
    createParticle(pos: Vec2d, vel: Vec2d, type: ParticleType) {
        this.particles.push(new Particle(this, pos, vel, type));
    }
    createParticlesCircle(pos: Vec2d, spawnRadius: number, outwardVel: number, randomVel: number, particleCount: number, type: ParticleType) {
        for (let i = 0; i < particleCount; i++) {
            let direction = Vec2d.randAngle(spawnRadius*Math.sqrt(Math.random()));
            this.particles.push(new Particle(
                this,
                pos.copy().add(direction),
                Vec2d.rand2D(randomVel).add(direction.copy().div(spawnRadius).mult(outwardVel)),
                type
            ));
        }
    }
    createParticlesSquare(pos: Vec2d, spawnRadius: number, rotation: number, outwardVel: number, randomVel: number, particleCount: number, type: ParticleType) {
        for (let i = 0; i < particleCount; i++) {
            let direction = Vec2d.randBox(spawnRadius*2,spawnRadius*2).subXY(spawnRadius, spawnRadius).rotate(rotation);
            this.particles.push(new Particle(
                this,
                pos.copy().add(direction),
                Vec2d.rand2D(randomVel).add(direction.copy().div(spawnRadius).mult(outwardVel)),
                type
            ));
        }
    }
    createParticlesLine(pos: Vec2d, length: number, rotation: number, outwardVel: number, randomVel: number, particleCount: number, type: ParticleType) {
        for (let i = 0; i < particleCount; i++) {
            let direction = Vec2d.randBox(length, 0).subXY(length/2, 0).rotate(rotation);
            this.particles.push(new Particle(
                this,
                pos.copy().add(direction),
                Vec2d.rand2D(randomVel).add(direction.copy().div(length/2).mult(outwardVel)),
                type
            ));
        }
    }
    draw(dt) {
        let ctx = this.dungineRoom.dungine.canvas.ctx;
        for (const particle of this.particles) {
            particle.draw(ctx, dt);
        }
        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].dead) {
                this.particles.splice(i,1);
                i--;
            }
        }
    }
}

export type ParticleType = {
    red: number,
    green: number,
    blue: number,
    opacity: number,
    size: number,
    fadeStart: number,
    fadeEnd: number,
}

class Particle {
    particleManager: ParticleManager
    pos: Vec2d
    vel: Vec2d
    type: ParticleType
    age: number
    dead: boolean
    constructor(particleManager: ParticleManager, pos: Vec2d, vel: Vec2d, type: ParticleType) {
        this.particleManager = particleManager;
        this.pos = pos;
        this.vel = vel;
        this.type = type;
        this.age = 0;
        this.dead = false;
    }
    draw(ctx: CanvasRenderingContext2D, dt: number) {
        this.pos.add(this.vel.copy().mult(dt));
        this.age += dt;

        let fade = 1;
        if (this.age > this.type.fadeEnd) {
            fade = 0;
            this.dead = true;
        } else if (this.age > this.type.fadeStart) {
            // debugger
            fade = 1-(this.age-this.type.fadeStart)/(this.type.fadeEnd-this.type.fadeStart);
        }
        ctx.fillStyle = `rgba(${this.type.red}, ${this.type.green}, ${this.type.blue}, ${this.type.opacity*fade})`;
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y, this.type.size/2*fade, this.type.size/2*fade, 0, 0, Math.PI*2);
        ctx.fill();
    }
}