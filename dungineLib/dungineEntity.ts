import { Dungine } from "../dungineLib/dungine.js";
import { DungineCanvas } from "../dungineLib/dungineCanvas.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";
import { EventManager } from "./eventManager.js";

export abstract class DungineEntity {
    dungine: Dungine
    pos: Vec2d
    vel: Vec2d
    lastTickTime: number
    radius: number
    room: DungineRoom | undefined
    private eventManager: EventManager<DungineEntity>
    properties: {[propertyName: string]: any}

    constructor(dungine: Dungine, room: DungineRoom, pos: Vec2d, vel: Vec2d, radius: number) {
        this.dungine = dungine;
        this.room = room;
        this.pos = pos;
        this.vel = vel;
        this.radius = radius;
        this.eventManager = new EventManager(this);
        this.properties = {};

        this.eventManager.addEventType("tick")
        this.addEventListener("tick", "movement", (entity, args) => {
            entity.pos.add(entity.vel.copy().mult(args.dt));
        })
        this.addEventListener("tick", "walls", (entity, args) => {
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
    }

    addEventListener(eventName: string, listenerName: string, listener: (object: DungineEntity, args: {[argName: string]: any}) => void, before?: string[]) {
        this.eventManager.addEventListener(eventName, listenerName, listener, before);
    }

    removeEventListener(eventName: string, listenerName: string) {
        this.eventManager.removeEventListener(eventName, listenerName)
    }

    triggerEvent(eventName: string, args: {[argName: string]: any}) { // see js Event constructor docs.
        this.eventManager.triggerEvent(eventName, args);
    }
    
    draw(dungineCanvas: DungineCanvas, timeSinceLastTick) {
        let currentPos = this.pos.copy().add(this.vel.copy().mult(timeSinceLastTick));
        let ctx = dungineCanvas.ctx;
        ctx.fillStyle = "#f00";
        ctx.fillRect(currentPos.x-this.radius, currentPos.y-this.radius, this.radius*2, this.radius*2);
    }
}