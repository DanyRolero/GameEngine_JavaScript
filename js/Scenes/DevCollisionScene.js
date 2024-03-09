import Scene from "../AbstractScene.js";
import GOTime from "../GObjects/GOTime.js";
import SquareShip from "../GObjects/SquareShip.js";
import GOSquare from "../GObjects/GOSquare.js";
import { game, keyboard, graphics, collisionRect } from "../main.js";
import Rect from "../CollisionDetectors/Utils/Rect.js";
import Vector from "../CollisionDetectors/Utils/Vector.js";
import GOVector from "../GObjects/GOVector.js";
import Line from "../CollisionDetectors/Utils/Line.js";


export default class DevCollisionScene extends Scene {
    gobjects = [];
    isPaused = false;
    axis = [];
    corners = [];
    rect1;

    onLoad() {
        this.gobjects.push(new SquareShip(0, 0, 150, 150, 90));
        this.rect1 = new Rect(this.gobjects[0]);
        this.axis = this.rect1.getAxis();

        console.log(this.axis);
        game.play();
    }


    update() { 
        this.gobjects[0].update();
        this.rect1 = new Rect(this.gobjects[0]);
        this.axis = this.rect1.getAxis();
    }

    draw() { 
        graphics.clearScreen();
        this.gobjects[0].draw();
        graphics.line({x1:this.axis[0].origin.x, y1: this.axis[0].origin.y, x2:this.axis[0].direction.x, y2: this.axis[0].direction.y});
        graphics.line({x1:this.axis[1].origin.x, y1: this.axis[1].origin.y, x2:this.axis[1].direction.x, y2: this.axis[1].direction.y});
        
    }


    pause() { this.isPaused = true; }

    resume() {this.isPaused = false }


    onChange() {
        this.gobjects.length = 0;
        this.images.length = 0;
    }
}