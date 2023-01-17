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
    spawnParticles(spawn: ParticleSpawn, pos: Vec2d, rotation = Math.random()*Math.PI*2) {
        for (let i = 0; i < spawn.particleCount; i++) {
            let direction;
            switch (spawn.shape) {
                case "circle":
                    direction = Vec2d.randAngle(spawn.size/2*Math.sqrt(Math.random()));
                    break;

                case "square":
                    direction = Vec2d.randBox(spawn.size).subXY(spawn.size, spawn.size).rotate(rotation);
                    break;

                case "line":
                    direction = Vec2d.randBox(spawn.size, 0).subXY(spawn.size/2, 0).rotate(rotation);
                    break;
                default:
                    break;
            }
            this.particles.push(new Particle(
                this,
                pos.copy().add(direction),
                Vec2d.rand2D(spawn.randomVel).add(direction.copy().div(spawn.size).mult(spawn.outwardVel)),
                spawn.particleTypes[Math.floor(Math.random()*spawn.particleTypes.length)]
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

export type ParticleSpawn = {
    shape: "circle" | "square" | "line",
    size: number,
    outwardVel: number,
    randomVel: number,
    particleCount: number,
    particleTypes: ParticleType[],
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