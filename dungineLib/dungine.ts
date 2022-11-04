import { DungineCanvas } from "../dungineLib/dungineCanvas.js";
import { DungineRoom } from "../dungineLib/dungineRoom.js";
import { Vec2d } from "../dungineLib/vec2d.js";
import { DungineControls } from "./dungineControls.js";
import { EntityBehaviourManager } from "./entityBehaviourManager.js";
import { FunctionList } from "./functionList.js";

export class Dungine {
    canvas: DungineCanvas
    currentRoom: DungineRoom
    tickFunctions: FunctionList<(dt: number) => void>
    lastTickTime: number
    controls: DungineControls
    tickInterval: number
    entityBehaviourManager: EntityBehaviourManager

    constructor(canvas?: HTMLCanvasElement) {
        this.canvas = new DungineCanvas(this, canvas);

        this.entityBehaviourManager = new EntityBehaviourManager();

        this.currentRoom = new DungineRoom(this, new Vec2d(500,500));
        this.currentRoom.setCamGoal(this.canvas.camera);

        this.controls = new DungineControls();

        this.canvas.drawFunctions.add("currentRoom", (dungineCanvas, timeSinceLastTick) => {this.currentRoom.draw(dungineCanvas, timeSinceLastTick)});

        this.lastTickTime = Date.now();
        this.tickFunctions = new FunctionList();
        this.tickInterval = undefined;

        this.tickFunctions.add("heldKeys", (dt) => {this.controls.tick(dt)});
        this.tickFunctions.add("currentRoom", (dt) => {this.currentRoom.tick(dt)});
    }

    start() {
        this.tickInterval = setInterval(() => {
            let dt = (Date.now() - this.lastTickTime) / 1000;
            this.lastTickTime = Date.now();
            this.tickFunctions.excecute([dt]);
        }, 1000/60);
        this.canvas.start();
    }
}
