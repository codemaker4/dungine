import { Dungine } from "../dungineLib/dungine.js";
import { DungineCanvas } from "../dungineLib/dungineCanvas.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export abstract class DungineEntity {
    dungine: Dungine;
    pos: Vec2d
    radius: number
    room: DungineRoom | undefined;

    constructor(dungine: Dungine, room: DungineRoom, pos: Vec2d, radius: number) {
        this.dungine = dungine;
        this.room = room;
        this.pos = pos;
        this.radius = radius;
    }
    
    draw(dungineCanvas: DungineCanvas) {
        let ctx = dungineCanvas.ctx;
        ctx.fillStyle = "#f00";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
        ctx.fill();
    }
}