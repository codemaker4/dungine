import { DungineEntity } from "./dungineEntity.js"
import { FunctionList } from "./functionList.js"

export class EntityBehaviourManager {
    private behaviours: Map<string, EntityBehaviour>
    
    constructor() {
        this.behaviours = new Map();
    }

    async importBehaviour(path: string) {
        let newBehaviours = <{[key: string]: EntityBehaviour}> await import(path)
        for (const key in newBehaviours) {
            this.behaviours.set(key, newBehaviours[key]);
        }
    }

    createBehaviour(behavourName: string): EntityBehaviour {
        let newBehaviour = new EntityBehaviour();
        this.behaviours.set(behavourName, newBehaviour);
        return newBehaviour;
    }

    getBehaviour(behavourName: string): EntityBehaviour {
        let behaviour = this.behaviours.get(behavourName);
        if (!behaviour) {throw `Error: behaviour ${behavourName} not found. Maybe there was a typo or the behaviour hasn't been made or imported yet.`}
        return behaviour;
    }

    getBehaviours(behavourNames: string[]): EntityBehaviour[] {
        let behaviours:EntityBehaviour[] = [];
        for (const behaviourName of behavourNames) {
            behaviours.push(this.getBehaviour(behaviourName));
        }
        return behaviours;
    }

    doEvent(entity: DungineEntity, eventName: string, args: {[argName: string]: any}) {
        for (const behaviour of this.getBehaviours(entity.behaviours)) {
            behaviour.doEvent(eventName, entity, args);
        }
    }
}

export class EntityBehaviour {  // i.e. "Death"
    name: string
    private events: Map<string, FunctionList<(entity: DungineEntity, args: {[argName: string]:any})=>void>> // i.e. "tick": function list of one function: check if health = 0

    constructor() {
        this.events = new Map();
    }

    addFunction(conditionName: string, funcName: string, func:(entity: DungineEntity, args: {[argName: string]:any})=>void, before?: string[]) {
        if (!this.events.has(conditionName)) {
            this.events.set(conditionName, new FunctionList());
        }
        this.events.get(conditionName).add(funcName, func, before);
        return this;
    }

    doEvent(eventName: string, entity: DungineEntity, args: {[argName: string]: any}) {
        let eventFuncList = this.events.get(eventName)
        if (eventFuncList) {
            eventFuncList.excecute([entity, args]);
        }
    }
}