import { DungineCanvas } from "./dungineCanvas.js";
import { DungineRoom } from "./dungineRoom.js";
import { PlayerEntity } from "./playerEntity.js";
import { Vec2d } from "./vec2d.js";

export class Dungine {
    canvas: DungineCanvas
    dungineRoom: DungineRoom

    constructor(canvas?: HTMLCanvasElement) {
        this.canvas = new DungineCanvas(this, canvas);

        this.dungineRoom = new DungineRoom(this, new Vec2d(500,500));

        this.dungineRoom.entities.push(new PlayerEntity(this, this.dungineRoom));

        this.dungineRoom.setCamGoal(this.canvas.camera)

        this.canvas.drawFunctions.push((dungineCanvas) => this.dungineRoom.draw(dungineCanvas))
    }
}

window.addEventListener("load", () => {
    let dungine = new Dungine();
})
