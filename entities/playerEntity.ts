import { Dungine } from "../dungineLib/dungine.js";
import { DungineEntity } from "../dungineLib/dungineEntity.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export class PlayerEntity extends DungineEntity {
    constructor(dungine: Dungine, room: DungineRoom) {
        super(dungine, room, Vec2d.randBox(room.size.x, room.size.y), Vec2d.rand2D(500), 20);
    }

    tick(dt) {
        this.vel.mult(0.9);
        const MOVE_SPEED = 50;
        if (this.dungine.controls.heldCodes.has("KeyA")) this.vel.addXY(-MOVE_SPEED,0);
        if (this.dungine.controls.heldCodes.has("KeyD")) this.vel.addXY(MOVE_SPEED,0);
        if (this.dungine.controls.heldCodes.has("KeyW")) this.vel.addXY(0,-MOVE_SPEED);
        if (this.dungine.controls.heldCodes.has("KeyS")) this.vel.addXY(0,MOVE_SPEED);
        super.tick(dt);
    }
}