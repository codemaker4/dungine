import { FunctionList } from "./functionList.js"

export class EventManager <targetType>{
    private target: targetType
    private events: Map<string, FunctionList<(object: targetType, args: {[argName: string]: any})=>void>>

    constructor(target: targetType) {
        this.target = target;
        this.events = new Map();
    }

    addEventType(eventName: string) {
        if (this.events.has(eventName)) throw `Error adding event type: Event with name ${eventName} already exists.`;
        this.events.set(eventName, new FunctionList());
    }

    addEventListener(eventName: string, listenerName: string, listener: (object: targetType, args: {[argName: string]: any})=>void, before?: string[]) {
        if (!this.events.has(eventName)) throw `Error adding event listener: Event with name ${eventName} doesn't exist.`;
        this.events.get(eventName).add(listenerName, listener, before);
    }

    removeEventListener(eventName: string, listenerName: string) {
        if (!this.events.has(eventName)) throw `Error adding event listener: Event with name ${eventName} doesn't exist.`;
        this.events.get(eventName).remove(listenerName);
    }

    triggerEvent(eventName: string, args: {[argName: string]: any}) {
        if (!this.events.has(eventName)) throw `Error triggering event: Event with name ${eventName} doesn't exist.`;
        this.events.get(eventName).excecute([this.target, args])
    }

    destroy() {
        this.events = new Map();
    }
}