import { DungineCanvas } from "../dungineLib/dungineCanvas.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export class Dungine {
    canvas: DungineCanvas
    currentRoom: DungineRoom

    constructor(canvas?: HTMLCanvasElement) {
        this.canvas = new DungineCanvas(this, canvas);

        this.currentRoom = new DungineRoom(this, new Vec2d(500,500));

        this.currentRoom.setCamGoal(this.canvas.camera)

        this.canvas.drawFunctions.push((dungineCanvas) => this.draw(dungineCanvas))
    }

    draw(dungineCanvas: DungineCanvas) {
        this.currentRoom.draw(dungineCanvas);
    }
}
