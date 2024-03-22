import { graphics } from "../../main.js";
import GObject from "../GObject.js";
import { keyboard } from "../../main.js";
import { time } from "../../main.js";
import { game } from "../../main.js";


export default class GOPlayerPaddle extends GObject {
    constructor() {
        super({x:30, y:325, width:8, height:100})
    }

    maxSpeed = 0.5;
    aceleration = 0.1;
    currentSpeed = 0;

    topBound = game.currentScene.topBound;
    bottomBound = game.currentScene.bottomBound - this.height;


    //----------------------------------------------------------------------------------------------------
    update() {
        if (keyboard.key('ArrowUp') || keyboard.key('ArrowDown')) {
            this.upAceleration();
            this.downAcelertion();
        }

        else {
            if (this.currentSpeed != 0) {
                if (this.currentSpeed < 0) this.upDeceleration();
                else this.downDeceleration();
 
            }
        }

        this.move();
        this.onTopBound();
        this.onBottomBound();
    }

    //----------------------------------------------------------------------------------------------------
    draw() {
        graphics.fillRect({ x: this.x, y: this.y, width: this.width, height: this.height });
    }

    //----------------------------------------------------------------------------------------------------
    upAceleration() {
        if (keyboard.key('ArrowUp')) {
            if (this.currentSpeed > -this.maxSpeed) {
                this.currentSpeed -= this.aceleration;
                if (this.currentSpeed < -this.maxSpeed) this.currentSpeed = -this.maxSpeed;
            }
        }
    }

    //----------------------------------------------------------------------------------------------------
    upDeceleration() {
        this.currentSpeed + this.aceleration > 0 ? this.currentSpeed = 0 : this.currentSpeed += this.aceleration;
    }

    //----------------------------------------------------------------------------------------------------
    downAcelertion() {
        if (keyboard.key('ArrowDown')) {
            if (this.currentSpeed < this.maxSpeed) {
                this.currentSpeed += this.aceleration;
                if (this.currentSpeed > this.maxSpeed) this.currentSpeed = this.maxSpeed;
            }
        }
    }

    //----------------------------------------------------------------------------------------------------
    downDeceleration() {
        this.currentSpeed - this.aceleration < 0 ? this.currentSpeed = 0 : this.currentSpeed -= this.aceleration
    }

    //----------------------------------------------------------------------------------------------------
    move() {
        this.y += this.currentSpeed * time.deltaTime;
    }

    //----------------------------------------------------------------------------------------------------
    onTopBound() {
        if (this.y < this.topBound) {
            this.y = this.topBound;
            this.currentSpeed = 0;
        }
    }

    //----------------------------------------------------------------------------------------------------
    onBottomBound() {
        if (this.y > this.bottomBound) {
            this.y = this.bottomBound;
            this.currentSpeed = 0;
        }
    }

}