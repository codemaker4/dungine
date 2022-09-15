import { Dungine } from "./dungine.js";

export class DungineCanvas {
    dungine: Dungine
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    width: number
    height: number
    drawFunctions: ((dungineCanvas: DungineCanvas) => void)[]

    constructor(dungine: Dungine, canvas?: HTMLCanvasElement) {
        this.dungine = dungine;
        
        if (canvas) this.canvas = canvas;
        else this.canvas = <HTMLCanvasElement> document.getElementById("dungineCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.drawFunctions = [];
        
        let updateCanvasSize = () => {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        }

        updateCanvasSize();
        window.addEventListener("resize", () => {updateCanvasSize()});

        this.draw();
    }

    draw() {
        for (const drawFunc of this.drawFunctions) {
            drawFunc(this);
        }
        requestAnimationFrame(this.draw);
    }
}