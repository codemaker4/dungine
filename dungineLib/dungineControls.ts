import { FunctionList } from "./dungineFunctionList.js";

export class DungineControls {
    onkeydown: FunctionList<(e: KeyboardEvent, controls:DungineControls) => void>
    onkeyup: FunctionList<(e: KeyboardEvent, controls:DungineControls) => void>
    onkeyheldtick: FunctionList<(dt: number, controls:DungineControls) => void>
    heldKeys: Set<string>
    heldCodes: Set<string>

    constructor() {
        this.onkeydown = new FunctionList();
        this.onkeyup = new FunctionList();
        this.onkeyheldtick = new FunctionList();
        this.heldKeys = new Set();
        this.heldCodes = new Set();

        window.addEventListener("keydown", (e) => {
            if (e.repeat) return;
            this.heldKeys.add(e.key.toLowerCase());
            this.heldCodes.add(e.code)
            this.onkeydown.excecute([e, this]);
        });

        window.addEventListener("keyup", (e) => {
            this.onkeyup.excecute([e, this]);
            this.heldKeys.delete(e.key.toLowerCase());
            this.heldCodes.delete(e.code);
        });
    }

    tick(dt) {
        this.onkeyheldtick.excecute([dt, this]);
    }
}