import { Dungine } from "./dungine.js";
import { DungineEntity } from "./dungineEntity.js";
import { DungineRoom } from "./dungineRoom.js";
import { Vec2d } from "./vec2d.js";

export class PlayerEntity extends DungineEntity {
    constructor(dungine: Dungine, room: DungineRoom) {
        super(dungine, room, Vec2d.randBox(room.size.x, room.size.y), 20);
    }
}