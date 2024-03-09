import Scene from "../AbstractScene.js";
import { game } from "../main.js";

export default class DefaultScene extends Scene {
    counter = 0;

    onLoad() {
        console.log(this.counter);
        this.counter++;
        console.log(game.currentScene.counter);
    }

    onChange() {
        this.gobjects.length = 0;
        this.images.length = 0;
    }
}