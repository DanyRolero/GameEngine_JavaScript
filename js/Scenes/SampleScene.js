import Scene from "./AbstractScene.js";
import GOTime from "../GObjects/GOTime.js";
import SquareShip from "../GObjects/SquareShip.js";
import GOSquare from "../GObjects/GOSquare.js";
import { game, keyboard, graphics, collision } from "../main.js";
import Rect from "../CollisionDetectors/Utils/Rect.js";

// Escena para testear Colisiones entre rectangulos rotados
export default class SampleScene extends Scene {
    //images = [];
    gobjects = [];
    isPaused = false;

    onLoad() {
        this.gobjects.push(new SquareShip(275, 550, 350, 20, 0));
        this.gobjects.push(new GOSquare(250, 100, 50 , 50, 40));
        this.gobjects.push(new GOTime());
        game.play();
    }

    frame() {
        if(keyboard.key('p')) {
            keyboard.click('p');
            this.isPaused ? this.resume() : this.pause();
        }
        if(this.isPaused) return;
        this.draw();
        this.update();
    }

    update() { 
        for(let i = 0; i < this.gobjects.length; i++) this.gobjects[i].update();
        if(collisionRect.isCollision(this.gobjects[1], this.gobjects[0])) console.log('colision');
    }


    pause() { this.isPaused = true; }

    resume() {this.isPaused = false }


    onChange() {
        this.gobjects.length = 0;
        this.images.length = 0;
    }
}