import { Dungine } from "./dungine.js";
import { DungineCamera } from "./dungineCamera.js";
import { DungineCanvas } from "./dungineCanvas.js";
import { Vec2d } from "./vec2d.js";

export class DungineRoom {
    dungine: Dungine
    size: Vec2d

    constructor(dungine: Dungine, size: Vec2d) {
        this.dungine = dungine
        this.size = size;
    }

    setCamGoal(dungineCamera: DungineCamera) {
        dungineCamera.setGoalPos(this.size.copy().div(2));
    }

    draw(dungineCanvas: DungineCanvas) {
        let ctx = dungineCanvas.ctx;
        ctx.fillStyle = "#ddd";
        ctx.fillRect(0,0,this.size.x,this.size.y);
    }
}