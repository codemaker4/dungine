import { Dungine } from "./dungineLib/dungine.js";
import { PlayerEntity } from "./entities/playerEntity.js";

window.addEventListener("load", () => {
    let dungine = new Dungine();
    
    dungine.currentRoom.entities.push(new PlayerEntity(dungine, dungine.currentRoom))
})