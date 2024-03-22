import Scene from "./AbstractScene.js";
import GOTime from "../GObjects/GOTime.js";
import SquareShip from "../GObjects/SquareShip.js";
import GOSquare from "../GObjects/GOSquare.js";
import { game, keyboard, graphics, collision } from "../main.js";
import Rect from "../CollisionDetectors/Utils/Rect.js";
import Vector from "../CollisionDetectors/Utils/Vector.js";
import GOVector from "../GObjects/GOVector.js";
import Line from "../CollisionDetectors/Utils/Line.js";


export default class DevCollisionScene extends Scene {
    gobjects = [];
    isPaused = false;
    axis = [];
    axis2 = [];
    corners = [];
    rect1;
    rect2;
    projection1;

    onLoad() {
        this.gobjects.push(new SquareShip(0, 0, 150, 150, 0));
        this.gobjects.push(new GOSquare(250, 250, 50, 50, 30));
        this.rect1 = new Rect(this.gobjects[0]);
        this.rect2 = new Rect(this.gobjects[1]);
        this.axis = this.rect1.getAxis();
        this.axis2 = this.rect2.getAxis();
        this.corners = this.rect1.getCorners();
        this.projection1 = this.corners[0].Project(this.axis2[0]);


        game.play();
    }


    update() { 
        this.gobjects[0].update();
        this.rect1 = new Rect(this.gobjects[0]);
        this.rect2 = new Rect(this.gobjects[1]);
        this.axis = this.rect1.getAxis();
        this.axis2 = this.rect2.getAxis();
        this.corners = this.rect1.getCorners();
        this.projection1 = this.corners[0].Project(this.axis2[0]);
    }

    draw() { 
        graphics.clearScreen();
        this.gobjects[0].draw();
        this.gobjects[1].draw();
        //graphics.line({x1: (this.axis[0].direction.x * 100) + this.rect1.center.x, y1: (this.axis[0].direction.y*100) + this.rect1.center.y, x2: (this.axis[0].direction.x*-100) + this.rect1.center.x, y2: (this.axis[0].direction.y*-100) + this.rect1.center.y});
        //graphics.line({x1:this.axis[1].origin.x, y1: this.axis[1].origin.y, x2:this.axis[1].direction.x, y2: this.axis[1].direction.y});
        graphics.fillCircle({x: this.projection1.x-5, y: this.projection1.y-5, radius:5, color: 'blue'});
        //graphics.fillCircle({x: this.corners[0].x-5, y: this.corners[0].y-5, radius:5, color: 'blue'});
        //graphics.fillCircle({x: this.corners[1].x-5, y: this.corners[1].y-5, radius:5, color: 'blue'});
        //graphics.fillCircle({x: this.corners[2].x-5, y: this.corners[2].y-5, radius:5, color: 'blue'});
        //graphics.fillCircle({x: this.corners[3].x-5, y: this.corners[3].y-5, radius:5, color: 'blue'});
    }

    frame() {
        if(keyboard.key('p')) {
            keyboard.click('p');
            this.isPaused ? this.resume() : this.pause();
        }
        if(this.isPaused) return;

        window.console.clear();
        console.log(this.axis);
        console.log(this.corners);
        this.draw();
        this.update();
    }


    pause() { this.isPaused = true; }

    resume() {this.isPaused = false }


    onChange() {
        this.gobjects.length = 0;
        this.images.length = 0;
    }
}