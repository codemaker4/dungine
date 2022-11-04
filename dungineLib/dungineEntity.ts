import { Dungine } from "../dungineLib/dungine.js";
import { DungineCanvas } from "../dungineLib/dungineCanvas.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export abstract class DungineEntity {
    dungine: Dungine
    pos: Vec2d
    vel: Vec2d
    lastTickTime: number
    radius: number
    room: DungineRoom | undefined
    behaviours: string[]
    properties: {[propertyName: string]: any}

    constructor(dungine: Dungine, room: DungineRoom, pos: Vec2d, vel: Vec2d, radius: number) {
        this.dungine = dungine;
        this.room = room;
        this.pos = pos;
        this.vel = vel;
        this.radius = radius;
        this.behaviours = ["movement", "wallCollision"];
        this.properties = {};
    }

    doBehaviourEvent(eventName: string, args: {[argName: string]: any}) {
        this.dungine.entityBehaviourManager.doEvent(this, eventName, args);
    }
    
    draw(dungineCanvas: DungineCanvas, timeSinceLastTick) {
        let currentPos = this.pos.copy().add(this.vel.copy().mult(timeSinceLastTick));
        let ctx = dungineCanvas.ctx;
        ctx.fillStyle = "#f00";
        ctx.fillRect(currentPos.x-this.radius, currentPos.y-this.radius, this.radius*2, this.radius*2);
    }
}