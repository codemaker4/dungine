import { Dungine } from "./dungineLib/dungine.js";
import { PlayerEntity } from "./entities/playerEntity.js";

window.addEventListener("load", () => {
    let dungine = new Dungine();
    dungine.dungineRoom.entities.push(new PlayerEntity(dungine, dungine.dungineRoom))
})