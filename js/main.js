// Objetos Globales
var keyboard = new KeyboardClass();
var mouse = new MouseClass();
var audio = new AudioClass();
var graphics = new canvasAPI('canvasID');
var time = new Time();
// Collisions


//var game = new Game();
//game.init(new SampleScene());

let v1 = new Vector(0,0);
let v2 = new Vector(0,4);
let v3 = new Vector(4,2);

let l1 = new Line(v1,v2);

let o1 = new GObject(0,0,2,2,0);
let r1 = new Rect(o1);
console.dir(r1.getAxis());
