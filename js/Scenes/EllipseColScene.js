import Scene from "./AbstractScene.js";
import GOTime from "../GObjects/GOTime.js";
import SquareShip from "../GObjects/SquareShip.js";
import GOSquare from "../GObjects/GOSquare.js";
import { game, keyboard, graphics, collision } from "../main.js";
import Rect from "../CollisionDetectors/Utils/Rect.js";
import Vector from "../CollisionDetectors/Utils/Vector.js";
import GOVector from "../GObjects/GOVector.js";
import Line from "../CollisionDetectors/Utils/Line.js";
import GOEllipse from "../GObjects/GOEllipse.js";

export default class EllipseColScene extends Scene {
    onLoad() {
        this.gobjects.push(new GOEllipse(50, 50, 50, 50));
        this.gobjects.push(new GOEllipse(40, -10, 150, 50));
        game.play();
    }

    update(){ 
        for(let i = 0; i < this.gobjects.length; i++) this.gobjects[i].update();
        if(collision.isCollision(this.gobjects[0], this.gobjects[1])) console.log('colision');
    }


    pause() { this.isPaused = true; }

    resume() {this.isPaused = false }


    onChange() {
        this.gobjects.length = 0;
        this.images.length = 0;
    }
}