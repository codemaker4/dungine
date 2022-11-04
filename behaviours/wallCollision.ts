import { DungineEntity } from "../dungineLib/dungineEntity.js";
import { EntityBehaviour } from "../dungineLib/entityBehaviourManager.js";

let wallCollision = new EntityBehaviour();

wallCollision.addFunction("tick", "wallCollision", (entity: DungineEntity, args: {[argName: string]:any}) => {

    if (entity.pos.x < entity.radius) {
        entity.pos.x = entity.radius;
        entity.vel.x = 0;
    } else if (entity.pos.x > entity.room.size.x-entity.radius) {
        entity.pos.x = entity.room.size.x-entity.radius;
        entity.vel.x = 0;
    }
    if (entity.pos.y < entity.radius) {
        entity.pos.y = entity.radius;
        entity.vel.y = 0;
    } else if (entity.pos.y > entity.room.size.y-entity.radius) {
        entity.pos.y = entity.room.size.y-entity.radius;
        entity.vel.y = 0;
    }

})

export {wallCollision}