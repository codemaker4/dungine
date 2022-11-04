import { DungineEntity } from "../dungineLib/dungineEntity.js";
import { EntityBehaviour } from "../dungineLib/entityBehaviourManager.js";

let movement = new EntityBehaviour();

movement.addFunction("tick", "movement", (entity: DungineEntity, args: {[argName: string]:any}) => {

    entity.pos.add(entity.vel.copy().mult(args.dt));

})

export {movement}