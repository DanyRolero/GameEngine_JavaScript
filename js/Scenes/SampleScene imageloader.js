import Scene from "../AbstractScene.js";
import GOTime from "../GObjects/GOTime.js";
import SquareShip from "../GObjects/SquareShip.js";
import { game, keyboard } from "../main.js";


export default class SampleScene {
    //images = [];
    gobjects = [];
    isPaused = false;

    onLoad() {
        this.gobjects.push(new SquareShip(275, 550, 50, 50));
        this.gobjects.push(new GOTime());
        game.play();

        //let imgLoader = new ImageLoader();  
        //this.images['img1'] = imgLoader.loadImage('./img/sample1.png');
        //this.images['img2'] = imgLoader.loadImage('./img/sample2.png');
        //this.images['img3'] = imgLoader.loadImage('./img/sample3.png', window.game.play.bind(window.game));
    }

    frame() {
        this.draw();
        this.update();
    }

    update(){
        if(keyboard.key('p')) {
            keyboard.click('p');
            if(this.isPaused) this.resume();
            else this.pause();
        }
        if(this.isPaused) return;
        for(let i = 0; i < this.gobjects.length; i++) this.gobjects[i].update();
    }

    pause() { 
        this.isPaused = true;
        console.log('pause');
        
    }

    resume() {this.isPaused = false }

    draw() { for(let i = 0; i < this.gobjects.length; i++) this.gobjects[i].draw();}

    onChange() {
        this.gobjects.length = 0;
        this.images.length = 0;
    }
}