import { DungineEntity } from "../dungineLib/dungineEntity.js";
import { EntityBehaviour } from "../dungineLib/entityBehaviourManager.js";

let behaviourName = new EntityBehaviour();

behaviourName.addFunction("conditionName_ie_tick_or_collision", "functionName_ie_movement_or_push", (entity: DungineEntity, args: {[argName: string]:any}) => {

    // start custom code
    console.log(`This is a template behaviour, it was excecuted on the entity ${entity}. Don't import and or excecute this template behaviour, replace the template names with real values.`);
    // end custom code

}) // optionally add a list of function names that need to happen after this function. Read the functionList docs for more info.

// one behaviour can have multiple functions

export {behaviourName}