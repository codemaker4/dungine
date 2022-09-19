import { DungineCanvas } from "../dungineLib/dungineCanvas.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export class Dungine {
    canvas: DungineCanvas
    dungineRoom: DungineRoom

    constructor(canvas?: HTMLCanvasElement) {
        this.canvas = new DungineCanvas(this, canvas);

        this.dungineRoom = new DungineRoom(this, new Vec2d(500,500));

        this.dungineRoom.setCamGoal(this.canvas.camera)

        this.canvas.drawFunctions.push((dungineCanvas) => this.dungineRoom.draw(dungineCanvas))
    }
}

window.addEventListener("load", () => {
    let dungine = new Dungine();
})
