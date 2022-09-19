import { DungineCanvas } from "../dungineLib/dungineCanvas.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export class DungineCamera {
    dungineCanvas: DungineCanvas
    startPos: Vec2d
    endPos: Vec2d
    startTime: number
    endTime: number
    defaultmoveDuration: number

    constructor(dungineCanvas: DungineCanvas) {
        this.dungineCanvas = dungineCanvas;
        this.startPos = new Vec2d(0,0);
        this.endPos = this.startPos.copy();
        this.startTime = 0;
        this.endTime = 1;
        this.defaultmoveDuration = 1000;
    }

    get pos(): Vec2d {
        let fac = Math.min(Math.max((Date.now()-this.startTime)/(this.endTime-this.startTime),0),1);
        return this.startPos.copy().add(
            this.endPos.copy().sub(this.startPos).mult(fac)
        )
    }

    setGoalPos(goalPos: Vec2d) {
        this.startPos.set(this.pos);
        this.endPos.set(goalPos);
        this.startTime = Date.now();
        this.endTime = Date.now()+this.defaultmoveDuration;
    }

    doTransform() {
        let ctx = this.dungineCanvas.ctx;
        ctx.translate(-this.pos.x, -this.pos.y);
        ctx.translate(this.dungineCanvas.width/2, this.dungineCanvas.height/2);
    }
}