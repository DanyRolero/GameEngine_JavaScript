import { time } from "./main.js";


export default class Game {
    initialScene;
    currentScene;
    requestAnimationID;
    amountGObjects = 0;
    isPaused = false;
    isPausable = false;



    //---------------------------------------------------------------------------------------------------
    init(initialScene) {
        this.initialScene = initialScene;
        this.currentScene = initialScene;
        this.currentScene.onLoad();
    }

    //---------------------------------------------------------------------------------------------------
    loadScene(scene) {
        this.pause();
        this.currentScene.onChange();
        this.currentScene = scene;
        this.currentScene.onLoad();
    }

    //---------------------------------------------------------------------------------------------------
    play() {
        this.currentScene.frame();
        time.countFPS();
        time.countDeltaTime();
        this.requestAnimationID = window.requestAnimationFrame(this.play.bind(this));
    }

    //---------------------------------------------------------------------------------------------------
    pause() {
        if(!this.isPausable) return;
        this.isPaused = true;
        window.cancelAnimationFrame(this.requestAnimationID);
    }

    //---------------------------------------------------------------------------------------------------
    resume() {
        console.log('resume');
        this.isPaused = false;
        this.play();
    }    

    //---------------------------------------------------------------------------------------------------
    restart() {
        this.loadScene(this.initialScene);
    }

    //---------------------------------------------------------------------------------------------------
    getAmountItems() {
        return this.currentScene.gobjects.length;
    }
}