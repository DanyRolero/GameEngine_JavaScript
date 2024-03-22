import KeyboardClass from "./KeyboardClass.js";
import Game from "./Game.js";
import PongScene from "./Scenes/PongScene.js";
import { canvasAPI } from "./canvasAPI.js";
import Time from "./Time.js";
import CollisionsRect from "./CollisionDetectors/CollisionsRect.js";




//Objetos globales
export let keyboard = new KeyboardClass();
export let graphics = new canvasAPI('canvasID');
export let game = new Game();
export let time = new Time();
export let collisionRect = new CollisionsRect();

game.init(new PongScene());