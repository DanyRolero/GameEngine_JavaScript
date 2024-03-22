// Emplear como plantilla básica de como debe ser una escena simple
import { graphics } from "../main.js";
import { game } from "../main.js";

export default class Scene {

    gobjects = [];

    
    onLoad(){ game.play();}

    frame() {
        this.draw();
        this.update();
    }

    update(){ for(let i = 0; i < this.gobjects.length; i++) this.gobjects[i].update();}

    draw() { 
        graphics.clearScreen();
        for(let i = 0; i < this.gobjects.length; i++) this.gobjects[i].draw();
    }


    addGObject(gobject) {
        this.gobjects.push(gobject);
    }
}