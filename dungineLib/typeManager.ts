export class TypeManager {
    types: Set<string>
    constructor() {
        this.types = new Set()
    }

    hasType(type: string) {
        return this.types.has(type);
    }

    checkTypeExists(type: string) {
        if (!this.hasType(type)) throw `Error: Type ${type} doesn't exist.`;
        return type
    }

    createType(type: string) {
        this.types.add(type);
    }

    removeType(type: string) {
        this.types.delete(type);
    }
}