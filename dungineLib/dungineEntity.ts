import { Dungine } from "../dungineLib/dungine.js";
import { DungineCanvas } from "../dungineLib/dungineCanvas.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";
import { Type } from "./typeManager.js";

export class DungineEntity {
    dungine: Dungine
    pos: Vec2d
    vel: Vec2d
    isStatic: boolean
    room: DungineRoom
    radius: number
    health: number; // set to infinity if indestructable
    age: number;

    type: Type
    properties: {[name: string]: any}

    constructor(dungine: Dungine, room: DungineRoom, pos: Vec2d, vel: Vec2d, isStatic: boolean, radius: number, health: number, type: Type) {
        this.dungine = dungine;
        this.room = room;
        this.pos = pos;
        this.vel = vel;
        this.isStatic = isStatic;
        this.radius = radius;
        this.health = health;
        this.age = 0;
        this.type = type;
        this.properties = {};
    }

    setDefaultProperty(propertyName: string, value: any) {
        if (this.properties[propertyName] === undefined) {
            this.properties[propertyName] = value;
        }
    }

    assertProperty(property: any, type: string, errorMSG:string) {
        if (typeof property !== type) {
            throw errorMSG;
        }
    }

    init() {
        for (const initFunc of this.type.componentSet.init) {
            initFunc(this, 1/60, {});
        }
    }

    tick(dt: number) {

        this.age += dt;

        if (this.isStatic) {
            this.vel.setXY(0,0);

        } else { // if can move
            this.pos.add(this.vel.copy().mult(dt));

            this.roomWallCollision(dt); 
        }


        for (const tickFunc of this.type.componentSet.tick) {
            tickFunc(this, dt, {});
        }
    }

    draw(dt: number) {
        for (const drawFunc of this.type.componentSet.draw) {
            drawFunc(this, dt, {canvas: this.dungine.canvas});
        }
    }

    collision(dt: number, other: DungineEntity, relPos: Vec2d, centerDist: number, edgeDist: number) {
        for (const collisionFunc of this.type.componentSet.collission) {
            collisionFunc(this, dt, {other: other, relPos: relPos, centerDist: centerDist, edgeDist: edgeDist});
        }
    }

    private roomWallCollision(dt: number) {
        let collissionHappened = false;
        let prefVel = this.vel.copy();
        if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.vel.x = 0;
            collissionHappened = true;
        } else if (this.pos.x > this.room.size.x-this.radius) {
            this.pos.x = this.room.size.x-this.radius;
            this.vel.x = 0;
            collissionHappened = true;
        }
        if (this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.vel.y = 0;
            collissionHappened = true;
        } else if (this.pos.y > this.room.size.y-this.radius) {
            this.pos.y = this.room.size.y-this.radius;
            this.vel.y = 0;
            collissionHappened = true;
        }
        if (collissionHappened) {
            for (const roomWallCollissionFunc of this.type.componentSet.roomWallCollission) {
                roomWallCollissionFunc(this, dt, {vel: prefVel});
            }
        }
    }
}