import { FunctionList } from "./functionList.js";

export class EventManager {
    events: Map<string, FunctionList<(thing: any)=>{}>>
    constructor() {
        this.events = new Map();
    }
    registerEventType(eventType: string) {
        if (this.events.has(eventType)) throw "Error: that event type exists already."
        this.events.set(eventType, new FunctionList);
    }
    registerEventTypes(eventTypes: string[]) {
        for (const eventType of eventTypes) {
            this.registerEventType(eventType);
        }
    }
    addEventListener(eventType: string, listenerName: string, beforeList: string[], listener: (thing: any)=>{}) {
        this.events.get(eventType).add(listenerName, listener, beforeList);
    }
    raiseEvent(eventType: string, thing: any) {
        this.events.get(eventType).excecute([thing]);
    }
}