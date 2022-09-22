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
        this.pos.add(this.vel.copy().mult(dt))
    }
    
    draw(dungineCanvas: DungineCanvas, timeSinceLastTick) {
        let currentPos = this.pos.copy().add(this.vel.copy().mult(timeSinceLastTick));
        let ctx = dungineCanvas.ctx;
        ctx.fillStyle = "#f00";
        ctx.beginPath();
        ctx.arc(currentPos.x, currentPos.y, this.radius, 0, Math.PI*2);
        ctx.fill();
    }
}