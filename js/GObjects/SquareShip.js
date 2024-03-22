import GObject from "./GObject.js";
import { graphics } from "../main.js";
import { keyboard } from "../main.js";
import { time } from "../main.js";
import { game } from "../main.js";


export default class SquareShip extends GObject {
    speed = 0.25;
    speedRotation = 0.25;

    //-----------------------------------------------------------------------------------------
    update() {
        this.up();
        this.down();
        this.left();
        this.right();
        this.rotateLeft();
        this.rotateRight();
    }

    //-----------------------------------------------------------------------------------------
    up() {
        if(keyboard.key('ArrowUp')){
            this.y -= (this.speed * time.deltaTime);
        }
    }

    //-----------------------------------------------------------------------------------------
    down() {
        if(keyboard.key('ArrowDown')){
            this.y += (this.speed * time.deltaTime);
        }
    }

    //-----------------------------------------------------------------------------------------
    left() {
        if(keyboard.key('ArrowLeft')){
            this.x -= (this.speed * time.deltaTime);
        }
    }

    //-----------------------------------------------------------------------------------------
    right() {
        if(keyboard.key('ArrowRight')){
            this.x += (this.speed * time.deltaTime);
        }
    }


    //-----------------------------------------------------------------------------------------
    rotateLeft() {
        if(keyboard.key('q')) {
            this.angle -= (this.speedRotation * time.deltaTime);
            //if(this.angle <= -360) this.angle = (this.angle + 360);
        }
    }

    //-----------------------------------------------------------------------------------------
    rotateRight() {
        if(keyboard.key('w')) {
            this.angle += (this.speedRotation * time.deltaTime);
            //if(this.angle >= 360) this.angle = (this.angle - 360);
        }
    }    



    //-----------------------------------------------------------------------------------------
    draw() {
        graphics.rotate(this, this.angle);
        graphics.fillRect({x: this.x, y: this.y, width: this.width, height: this.height, color: 'green'});
        graphics.resetTransform();
    }

 
    

}