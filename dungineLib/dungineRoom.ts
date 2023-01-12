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

    summon(type: string, pos: Vec2d, vel: Vec2d, args: { [argName: string]: any; }) {
        this.dungine.typeManager.getType(type).createEntity(this, pos, vel, args);
    }

    setCamGoal(dungineCamera: DungineCamera) {
        dungineCamera.setGoalPos(this.size.copy().div(2));
    }

    tick(dt: number) {
        for (const entity of this.entities) {
            entity.tick(dt);
        }

        for (let i = 0; i < this.entities.length; i++) {
            for (let j = i + 1; j < this.entities.length; j++) {
                let relPos = this.entities[j].pos.copy().sub(this.entities[i].pos);
                let centerDist = relPos.mag();
                let edgeDist = centerDist - (this.entities[i].radius + this.entities[j].radius)
                if (edgeDist < 0) {
                    this.entities[i].collision(dt, this.entities[j], relPos.copy(), centerDist, edgeDist);
                    this.entities[j].collision(dt, this.entities[i], relPos.mult(-1), centerDist, edgeDist);
                }
            }
        }

        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].health <= 0) {
                this.entities.splice(i, 1);
                i--;
            }
        }
    }

    draw(dt: number) {
        let ctx = this.dungine.canvas.ctx;
        ctx.fillStyle = "#ddd";
        ctx.fillRect(0,0,this.size.x,this.size.y);

        for (const entity of this.entities) {
            entity.draw(dt);
        }
    }
}