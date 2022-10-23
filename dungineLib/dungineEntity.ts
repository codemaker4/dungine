import { Dungine } from "../dungineLib/dungine.js";
import { DungineCanvas } from "../dungineLib/dungineCanvas.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export abstract class DungineEntity {
    dungine: Dungine
    pos: Vec2d
    vel: Vec2d
    lastTickTime: number
    radius: number
    room: DungineRoom | undefined

    constructor(dungine: Dungine, room: DungineRoom, pos: Vec2d, vel: Vec2d, radius: number) {
        this.dungine = dungine;
        this.room = room;
        this.pos = pos;
        this.vel = vel;
        this.radius = radius;
    }

    tick(dt: number) {
        this.pos.add(this.vel.copy().mult(dt));
        if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.vel.x = 0;
        } else if (this.pos.x > this.room.size.x-this.radius) {
            this.pos.x = this.room.size.x-this.radius;
            this.vel.x = 0;
        }
        if (this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.vel.y = 0;
        } else if (this.pos.y > this.room.size.y-this.radius) {
            this.pos.y = this.room.size.y-this.radius;
            this.vel.y = 0;
        }
    }
    
    draw(dungineCanvas: DungineCanvas, timeSinceLastTick) {
        let currentPos = this.pos.copy().add(this.vel.copy().mult(timeSinceLastTick));
        let ctx = dungineCanvas.ctx;
        ctx.fillStyle = "#f00";
        ctx.fillRect(currentPos.x-this.radius, currentPos.y-this.radius, this.radius*2, this.radius*2);
    }
}