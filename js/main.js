import KeyboardClass from "./KeyboardClass.js";
import Game from "./Game.js";
import SampleScene from "./Scenes/SampleScene.js";
import { canvasAPI } from "./canvasAPI.js";
import Time from "./Time.js";
import CollisionsRect from "./CollisionDetectors/CollisionsRect.js";
import CollisionsRotatedRect from "./CollisionDetectors/CollisionsRotatedRect.js";
import DevCollisionScene from "./Scenes/DevCollisionScene.js";









//Objetos globales
export let keyboard = new KeyboardClass();
export let graphics = new canvasAPI('canvasID');
export let game = new Game();
export let time = new Time();
export let collisionRect = new CollisionsRotatedRect();

game.init(new DevCollisionScene());


/* 
// Objetos Globales
var keyboard = new KeyboardClass();
var mouse = new MouseClass();
var audio = new AudioClass();
var graphics = new canvasAPI('canvasID');
var time = new Time();

// Collisions
//var col = new CollisionsRotatedRect();

var game = new Game();
game.init(new SampleScene());



let go1 = new GObject(2,2,2,4,0);
let go2 = new GObject(0,0,2,4,1);
let col = new CollisionsRotatedRect();
console.log(col.isCollision(go1,go2));
*/
