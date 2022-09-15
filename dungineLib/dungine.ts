import { DungineCanvas } from "./dungineCanvas.js";

export class Dungine {
    canvas: DungineCanvas

    constructor(canvas?: HTMLCanvasElement) {
        this.canvas = new DungineCanvas(this, canvas);

        let frameCounter = 0;
        this.canvas.drawFunctions.push((dungineCanvas) => {
            dungineCanvas.ctx.clearRect(0, 0, dungineCanvas.width, dungineCanvas.height);
        });
        this.canvas.drawFunctions.push((dungineCanvas) => {
            dungineCanvas.ctx.fillStyle = "#000000"
            dungineCanvas.ctx.beginPath();
            dungineCanvas.ctx.arc(
                dungineCanvas.width/2,
                dungineCanvas.height/2,
                dungineCanvas.height/2,
                0,
                frameCounter % (Math.PI*2)
            )
            dungineCanvas.ctx.fill();
            frameCounter += 0.1;
        });
    }
}

window.addEventListener("load", () => {
    let dungine = new Dungine();
})
