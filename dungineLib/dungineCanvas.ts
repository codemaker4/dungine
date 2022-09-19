import { Dungine } from "../dungineLib/dungine.js";
import { DungineCamera } from "../dungineLib/dungineCamera.js";

export class DungineCanvas {
    dungine: Dungine
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    width: number
    height: number
    drawFunctions: ((dungineCanvas: DungineCanvas) => void)[]
    camera: DungineCamera

    constructor(dungine: Dungine, canvas?: HTMLCanvasElement) {
        this.dungine = dungine;
        
        if (canvas) this.canvas = canvas;
        else this.canvas = <HTMLCanvasElement> document.getElementById("dungineCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.drawFunctions = [];

        this.camera = new DungineCamera(this);
        
        let updateCanvasSize = () => {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        }

        updateCanvasSize();
        window.addEventListener("resize", () => {updateCanvasSize()});

        requestAnimationFrame(() => this.draw());
    }

    draw() {
        this.ctx.resetTransform();
        this.ctx.fillStyle = "#000"
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.camera.doTransform();

        for (const drawFunc of this.drawFunctions) {
            drawFunc(this);
        }

        requestAnimationFrame(() => this.draw());
    }
}