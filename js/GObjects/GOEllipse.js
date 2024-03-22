import GObject from "./GObject.js";
import { graphics } from "../main.js";
import { keyboard } from "../main.js";
import { time } from "../main.js";


export default class GOEllipse extends GObject {    
    draw() {graphics.fillEllipse({x: this.x, y: this.y, width: this.width, height: this.height, color:'purple'})} 
}