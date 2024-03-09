// Emplear como plantilla básica de como debe ser una escena simple
import { graphics } from "./main.js";
import { game } from "./main.js";

export default class Scene {

    gobjects = [];


    // Abstracta
    // Acciones que se producen cuando se carga la escena
    // Aquí van los valores que re reestableceran cada vez que se cargue la escena
    // Se instancian GObjects y se añaden a gobjects
    // Generalmente llamará a la game.play() al final.
    
    onLoad(){ game.play();}

    frame() {
        this.draw();
        this.update();
    }
    // Acciones de actualizado en cada frame
    // Sobreescribir si es necesario
    update(){ for(let i = 0; i < this.gobjects.length; i++) this.gobjects[i].update();}

    // Acciones de dibujado en cada frame
    // Sobreescribir si es necesario
    draw() { 
        graphics.clearScreen();
        for(let i = 0; i < this.gobjects.length; i++) this.gobjects[i].draw();
    }

    // Abstracta
    // Acciones que se realizan justo antes de que se cambie a otra escena
    // Se podría usar para guardar datos que usaremos en otra escena, vaciar gobjects etc.
    
    //onChange(){}
}