import { keyboard } from "../main.js";
import { time } from "../main.js";
import GOAction from "./GOAction.js";

export default class CrossMoveSkill extends GOSkill {
    constructor(gobject) {
        super(gobject);

        this.speed = 0.25;
    }
    

    //-----------------------------------------------------------------------------------------
    update() {
        this.up();
        this.down();
        this.left();
        this.right();
    }
    //-----------------------------------------------------------------------------------------
    up() {
        if (keyboard.key('ArrowUp')) {
            this.y -= (this.speed * time.deltaTime);
        }
    }

    //-----------------------------------------------------------------------------------------
    down() {
        if (keyboard.key('ArrowDown')) {
            this.y += (this.speed * time.deltaTime);
        }
    }

    //-----------------------------------------------------------------------------------------
    left() {
        if (keyboard.key('ArrowLeft')) {
            this.x -= (this.speed * time.deltaTime);
        }
    }

    //-----------------------------------------------------------------------------------------
    right() {
        if (keyboard.key('ArrowRight')) {
            this.x += (this.speed * time.deltaTime);
        }
    }
}