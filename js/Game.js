class Game {
    scenes = [];
    initialScene;
    currentScene;
    requestAnimationID;
    amountGObjects = 0;

    //---------------------------------------------------------------------------------------------------
    init(initialScene) {
        this.initialScene = initialScene;
        this.currentScene = initialScene;
        this.currentScene.onLoad();
        this.play();
    }

    //---------------------------------------------------------------------------------------------------
    loadScene(scene) {
        this.pause();
        this.currentScene.onChange();
        this.currentScene = scene;
        this.currentScene.onLoad();
        this.play();
    }

    //---------------------------------------------------------------------------------------------------
    play() {
        graphics.clearScreen();
        this.currentScene.draw();
        this.currentScene.update();
        time.countDeltaTime();
        time.countFPS();
        this.requestAnimationID = window.requestAnimationFrame(this.play.bind(this));  
    }

    //---------------------------------------------------------------------------------------------------
    pause() {
        window.cancelAnimationFrame(this.requestAnimationID);
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