import { Dungine } from "./dungine.js"
import { Vec2d } from "./vec2d.js"

export class DungineControls {
    dungine: Dungine;
    onkeydown: ((e: KeyboardEvent, controls:DungineControls) => void)[]
    onkeyup: ((e: KeyboardEvent, controls:DungineControls) => void)[]
    onmousedown: ((e: MouseEvent, controls:DungineControls) => void)[]
    onmouseup: ((e: MouseEvent, controls:DungineControls) => void)[]
    onkeyheldtick: ((dt: number, controls:DungineControls) => void)[]
    heldCodes: Set<string>
    mousePos: Vec2d

    constructor(dungine: Dungine) {
        this.dungine = dungine;
        this.onkeydown = [];
        this.onkeyup = [];
        this.onmousedown = [];
        this.onmouseup = [];
        this.onkeyheldtick = [];
        this.heldCodes = new Set();
        this.mousePos = new Vec2d(0,0);

        window.addEventListener("keydown", (e) => {
            if (e.repeat) return;
            this.heldCodes.add(e.code)
            for (const func of this.onkeydown) {
                func(e, this);
            }
        });

        window.addEventListener("keyup", (e) => {
            for (const func of this.onkeyup) {
                func(e, this);
            }
            this.heldCodes.delete(e.code);
        });

        window.addEventListener("mousedown", (e) => {
            this.heldCodes.add(`Mouse${e.button}`)
            for (const func of this.onmousedown) {
                func(e, this);
            }
            e.preventDefault();
        });

        window.addEventListener("mouseup", (e) => {
            for (const func of this.onmouseup) {
                func(e, this);
            }
            this.heldCodes.delete(`Mouse${e.button}`)
        });

        window.addEventListener("mousemove", (e) => {
            this.mousePos.setXY(e.offsetX, e.offsetY);
            this.mousePos.subXY(this.dungine.canvas.width/2, this.dungine.canvas.height/2);
            this.mousePos.add(this.dungine.canvas.camera.pos);
        })
    }

    tick(dt) {
        for (const func of this.onkeyheldtick) {
            func(dt, this);
        }
    }
}