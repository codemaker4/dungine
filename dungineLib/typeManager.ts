import { Component, ComponentManager, ComponentSet } from "./componentManager.js";
import { Dungine } from "./dungine.js"
import { DungineEntity } from "./dungineEntity.js";
import { DungineRoom } from "./dungineRoom.js";
import { Vec2d } from "./vec2d.js";

export class TypeManager {
    dungine: Dungine
    types: Map<string, Type>
    componentManager: ComponentManager

    constructor(dungine: Dungine) {
        this.dungine = dungine;
        this.types = new Map
        this.componentManager = new ComponentManager(this.dungine);
    }

    // addType(type: Type) {
    //     if (this.types.has(type.name)) throw `Error creating type ${type.name}: A Type with that name already exists.`;
    //     this.types.set(type.name, type);
    // }

    addType(name: string, isStatic: boolean, health: number, radius: number, components: string[], entityConstructor: (entity: DungineEntity, args: {[argName: string]: any}) => void) {
        if (this.types.has(name)) throw `Error creating type ${name}: A Type with that name already exists.`;
        this.types.set(name, new Type(this, name, isStatic, health, radius, components, entityConstructor));
    }

    getType(name: string) {
        if (!this.types.has(name)) throw `Error getting type ${name}: A type with that name does not exist.`;
        return this.types.get(name);
    }
}

export class Type {
    typeManager: TypeManager
    name: string
    isStatic: boolean
    health: number
    radius: number
    componentSet: ComponentSet
    componentNameSet: Set<string>
    entityConstructor: (entity: DungineEntity, args: {[argName: string]: any}) => void

    constructor(typeManager: TypeManager, name: string, isStatic: boolean, health: number, radius: number, components: string[], entityConstructor: (entity: DungineEntity, args: {[argName: string]: any}) => void) {
        this.typeManager = typeManager;
        this.name = name;
        this.isStatic = isStatic;
        this.health = health;
        this.radius = radius;
        this.componentSet = new ComponentSet();
        this.componentNameSet = new Set();
        for (const componentName of components) {
            if (this.componentNameSet.has(componentName)) return;
            this.componentNameSet.add(componentName);
            this.componentSet.addComponent(this.typeManager.componentManager.getComponent(componentName))
        }
        this.entityConstructor = entityConstructor;
    }

    createEntity(room: DungineRoom, pos: Vec2d, vel: Vec2d = new Vec2d(0,0), args: {[argName: string]: any}) {
        let newEntity = new DungineEntity(room.dungine, room, pos, vel, this.isStatic, this.radius, this.health, this);
        room.entities.push(newEntity);
        this.entityConstructor(newEntity, args);
        newEntity.init();
        return newEntity
    }
}