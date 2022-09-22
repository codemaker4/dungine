import { Dungine } from "../dungineLib/dungine.js";
import { DungineCamera } from "../dungineLib/dungineCamera.js";
import { DungineCanvas } from "../dungineLib/dungineCanvas.js";
import { DungineEntity } from "../dungineLib/dungineEntity.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export class DungineRoom {
    dungine: Dungine
    size: Vec2d
    entities: DungineEntity[];

    constructor(dungine: Dungine, size: Vec2d) {
        this.dungine = dungine
        this.size = size;
        this.entities = [];
    }

    setCamGoal(dungineCamera: DungineCamera) {
        dungineCamera.setGoalPos(this.size.copy().div(2));
    }

    tick(dt: number) {
        for (const entity of this.entities) {
            entity.tick(dt);
        }
    }

    draw(dungineCanvas: DungineCanvas, timeSinceLastTick) {
        let ctx = dungineCanvas.ctx;
        ctx.fillStyle = "#ddd";
        ctx.fillRect(0,0,this.size.x,this.size.y);
        for (const entity of this.entities) {
            entity.draw(dungineCanvas, timeSinceLastTick);
        }
    }
}