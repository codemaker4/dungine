import { Dungine } from "./dungineLib/dungine.js";
import { PlayerEntity } from "./entities/playerEntity.js";

window.addEventListener("load", async () => {
    let dungine = new Dungine();

    await dungine.entityBehaviourManager.importBehaviour("/behaviours/movement.js");
    await dungine.entityBehaviourManager.importBehaviour("/behaviours/wallCollision.js");
    await dungine.entityBehaviourManager.importBehaviour("/behaviours/playerMovement.js");
    
    dungine.currentRoom.entities.push(new PlayerEntity(dungine, dungine.currentRoom));

    dungine.start();
})