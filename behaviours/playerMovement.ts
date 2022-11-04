import { DungineEntity } from "../dungineLib/dungineEntity.js";
import { EntityBehaviour } from "../dungineLib/entityBehaviourManager.js";

let playerMovement = new EntityBehaviour();
playerMovement.addFunction("tick", "playerMovement", (entity: DungineEntity, args: {[argName: string]:any}) => {

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

export {playerMovement}