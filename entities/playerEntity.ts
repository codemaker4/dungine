import { Dungine } from "../dungineLib/dungine.js";
import { DungineEntity } from "../dungineLib/dungineEntity.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export class PlayerEntity extends DungineEntity {
    constructor(dungine: Dungine, room: DungineRoom) {
        super(dungine, room, Vec2d.randBox(room.size.x, room.size.y), Vec2d.rand2D(500), 20);

        this.properties.playerMoveSpeed = 50;

        this.addEventListener("tick", "playerMovement", (entity, args) => {
            
            if (entity.properties.playerMoveSpeed === undefined) {
                console.error(`Error in playerMovement behaviour: entity.properties.playerMoveSpeed is not defined in entity. Setting to 0`, entity);
                entity.properties.playerMoveSpeed = 0;
            }
            const MOVE_SPEED = entity.properties.playerMoveSpeed;
        
            entity.vel.mult(0.9);
            if (entity.dungine.controls.heldCodes.has("KeyA")) entity.vel.addXY(-MOVE_SPEED,0);
            if (entity.dungine.controls.heldCodes.has("KeyD")) entity.vel.addXY(MOVE_SPEED,0);
            if (entity.dungine.controls.heldCodes.has("KeyW")) entity.vel.addXY(0,-MOVE_SPEED);
            if (entity.dungine.controls.heldCodes.has("KeyS")) entity.vel.addXY(0,MOVE_SPEED);
        
        })
    }
}