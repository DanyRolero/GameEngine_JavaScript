import { graphics } from "../../main.js";
import GObject from "../GObject.js";
import { keyboard } from "../../main.js";
import { time } from "../../main.js";
import { game } from "../../main.js";


export default class GOcpuPaddle extends GObject {
    constructor() {
        super({x:570, y:325, width:8, height:200})
        this.speed = 0.1;
        this.direction = -1;
        this.topBound = game.currentScene.topBound;
        this.bottomBound = game.currentScene.bottomBound - this.height;
    }




    //----------------------------------------------------------------------------------------------------
    update() {
        this.move();
        this.onTopBound();
        this.onBottomBound();
    }

    //----------------------------------------------------------------------------------------------------
    draw() {
        graphics.fillRect({ x: this.x, y: this.y, width: this.width, height: this.height });
    }



    //----------------------------------------------------------------------------------------------------
    move() {
        this.y += this.speed * time.deltaTime * this.direction;
    }

    //----------------------------------------------------------------------------------------------------
    onTopBound() {
        if (this.y < this.topBound) {
            this.y = this.topBound;
            this.direction = 1;
        }
    }

    //----------------------------------------------------------------------------------------------------
    onBottomBound() {
        if (this.y > this.bottomBound) {
            this.y = this.bottomBound;
            this.direction = -1;
        }
    }

}