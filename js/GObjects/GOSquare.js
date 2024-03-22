import GObject from "./GObject.js";
import { graphics } from "../main.js";

export default class GOSquare extends GObject {
    //-----------------------------------------------------------------------------------------
    draw() {
        graphics.fillRect({x: this.x, y: this.y, width: this.width, height: this.height, color: 'yellow'});
        graphics.resetTransform();
    }    
}