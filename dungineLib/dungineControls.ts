import { DungineFunctionList } from "./dungineFunctionList.js";

export class DungineControls {
    onkeydown: DungineFunctionList<(key: string, heldKeys: Set<string>) => void>
    onkeyup: DungineFunctionList<(key: string, heldKeys: Set<string>) => void>
    onkeyheldtick: DungineFunctionList<(heldKeys: Set<string>, dt: number) => void>
    heldKeys: Set<string>

    constructor() {
        this.onkeydown = new DungineFunctionList();
        this.onkeyup = new DungineFunctionList();
        this.onkeyheldtick = new DungineFunctionList();
        this.heldKeys = new Set();

        window.addEventListener("keydown", (e) => {
            if (e.repeat) return;
            this.heldKeys.add(e.key);
            this.onkeydown.excecute([e.key, this.heldKeys]);
        });

        window.addEventListener("keyup", (e) => {
            this.onkeydown.excecute([e.key, this.heldKeys]);
            this.heldKeys.delete(e.key);
        });
    }

    tick(dt) {
        this.onkeyheldtick.excecute([this.heldKeys, dt]);
    }
}