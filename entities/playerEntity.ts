import { Dungine } from "../dungineLib/dungine.js";
import { DungineEntity } from "../dungineLib/dungineEntity.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export class PlayerEntity extends DungineEntity {
    constructor(dungine: Dungine, room: DungineRoom) {
        super(dungine, room, Vec2d.randBox(room.size.x, room.size.y), Vec2d.rand2D(500), 20);
    }
}