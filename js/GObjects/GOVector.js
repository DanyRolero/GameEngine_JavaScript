import GObject from "./GObject.js";
import { graphics } from "../main.js";
import Vector from "../CollisionDetectors/Utils/Vector.js";

export default class GOVector extends GObject {
    //-----------------------------------------------------------------------------------------
    constructor(vector) {
        super(vector.x, vector.y);
        this.vector = vector;
    }

    update() {
        this.x = this.vector.x;
        this.y = this.vector.y;
    }

    draw() {
        graphics.fillCircle({x: this.x, y: this.y, width: this.width, height: this.height, radius:5, color: 'blue'});
        graphics.resetTransform();
    }    
}