import { DungineFunctionList } from "./dungineFunctionList";

export class DungineControls {
    onkeydown: DungineFunctionList<(key: string, heldKeys: Set<string>) => void>
    onkeyup: DungineFunctionList<(key: string, heldKeys: Set<string>) => void>
    onkeyheldtick: DungineFunctionList<(heldKeys: Set<string>) => void>
    heldKeys: Set<string>

    constructor() {
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

    tick() {
        this.onkeyheldtick.excecute([this.heldKeys]);
    }
}