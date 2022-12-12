import { DungineCanvas } from "../dungineLib/dungineCanvas.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";
import { DungineControls } from "./dungineControls.js";
import { TypeManager } from "./typeManager.js";

export class Dungine {
    canvas: DungineCanvas
    currentRoom: DungineRoom
    lastTickTime: number
    controls: DungineControls
    typeManager: TypeManager

    constructor(canvas?: HTMLCanvasElement) {
        this.canvas = new DungineCanvas(this, canvas);

        this.currentRoom = new DungineRoom(this, new Vec2d(500,500));
        this.currentRoom.setCamGoal(this.canvas.camera);

        this.controls = new DungineControls(this);

        this.lastTickTime = Date.now();

        this.typeManager = new TypeManager(this);
    }

    draw() {
        let dt = (Date.now() - this.lastTickTime) / 1000;
        this.lastTickTime = Date.now();

        this.canvas.draw();

        this.currentRoom.tick(dt);

        this.currentRoom.draw(dt);

        window.requestAnimationFrame(() => {this.draw()});

        // this.canvas.ctx.fillRect(this.controls.mousePos.x, this.controls.mousePos.y, 10,10); // mouse pos check
    }

    start() {
        window.requestAnimationFrame(() => {this.draw()});
    }
}
