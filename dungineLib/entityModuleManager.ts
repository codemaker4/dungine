import { DungineEntity } from "./dungineEntity";

export class EntityModuleManager {
    private modules: Map<string, (entity: DungineEntity)=>void>;
    constructor() {
        this.modules = new Map();
    }
    applyModule(name: string, entity: DungineEntity, properties?: {[propertyName: string]: any}) {
        if (!this.modules.has(name)) throw `Error getting module ${name}: Module does not exist or hasn't been imported yet.`;
        Object.assign(entity.properties, properties);
        if (!entity.modules.has(name)) { // don't re add the module if the entity already has it.
            this.modules.get(name)(entity);
            entity.modules.add(name);
        }
    }
    addModule(name: string, func: (entity: DungineEntity)=>void) {
        if (this.modules.has(name)) throw `Error adding module ${name}: there is already a module with that name.`;
        this.modules.set(name, func);
        // console.log(`Added module ${name}`);
    }
    async importModuleFile(path: string) {
        let modules = <{[moduleName: string]: (entity: DungineEntity)=>void}>await import(path);
        for (const moduleName in modules) {
            this.addModule(moduleName, modules[moduleName]);
        }
    }
}