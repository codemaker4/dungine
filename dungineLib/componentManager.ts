import { Dungine } from "./dungine.js";
import { DungineCanvas } from "./dungineCanvas.js";
import { DungineEntity } from "./dungineEntity.js";
import { Vec2d } from "./vec2d.js";

export class ComponentManager {
    dungine: Dungine
    components: Map<string, Component>

    constructor(dungine: Dungine) {
        this.dungine = dungine;
        this.components = new Map();
    }

    addComponent(name: string, component: Component) {
        if (this.components.has(name)) throw `Error: component with name ${name} already exists.`
        this.components.set(name, component);
        if (component.import) {
            component.import(this.dungine);
        }
    }

    getComponent(name: string) {
        if (!this.components.has(name)) throw `Error: component with name ${name} does not exist.`
        return this.components.get(name);
    }

    async importComponentFile(fileName: string) {
        let componentFile = <{[componentName: string]: Component}> await import(fileName);
        for (const componentName in componentFile) {
            this.addComponent(componentName, componentFile[componentName]);
        }
    }

    async importComponentFiles(fileNames: string[]) {
        await Promise.all(fileNames.map((fileName) => {
            return this.importComponentFile(fileName);
        }))
    }
}

type EventHandler<Args extends ({[argName: string]: any})> = (entity: DungineEntity, dt: number, args: Args) => void

export type Component = {
    collission?: EventHandler<{other: DungineEntity, relPos: Vec2d, centerDist: number, edgeDist: number}>
    death: EventHandler<{}>
    draw?: EventHandler<{canvas: DungineCanvas}>
    import?: (dungine: Dungine) => void
    init?: EventHandler<{}>
    roomWallCollission?: EventHandler<{}>
    tick?: EventHandler<{}>
}

export class ComponentSet {
    addComponent(component: Component) {
        for (const componentFuncName in component) {
            this[componentFuncName].push(component[componentFuncName]);
        }
    }
    collission: Component["collission"][] = []
    death: Component["death"][] = []
    draw: Component["draw"][] = []
    import: Component["import"][] = []
    init: Component["init"][] = []
    roomWallCollission: Component["roomWallCollission"][] = []
    tick: Component["tick"][] = []
}