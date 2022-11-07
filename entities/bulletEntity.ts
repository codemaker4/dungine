import { Dungine } from "../dungineLib/dungine.js";
import { DungineEntity } from "../dungineLib/dungineEntity.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export class BulletEntity extends DungineEntity {
    constructor(dungine: Dungine, room: DungineRoom, pos: Vec2d, vel: Vec2d, radius: number) {
        super(dungine, room, pos, vel, radius);

    }
}