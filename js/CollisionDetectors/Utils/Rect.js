import Vector from "./Vector.js";
import Line from "./Line.js";

export default class Rect {
    constructor({ x = 0, y = 0, width = 10, height = 10, theta = null, angle = 0 }) {
        this.center = new Vector({x:x + width/2, y: y + height/2 });
        this.size = new Vector({ x: width, y: height });
        this.theta = theta || this.toRadians(angle);
    }

    toRadians = (degrees) => (degrees * Math.PI) / 180;
  
    getAxis() {
        const OX = new Vector({ x: 1, y: 0 });
        const OY = new Vector({ x: 0, y: 1 });
        const RX = OX.Rotate(this.theta);
        const RY = OY.Rotate(this.theta);
        return [
            new Line({ ...this.center, dx: RX.x, dy: RX.y }),
            new Line({ ...this.center, dx: RY.x, dy: RY.y }),
        ];
    }
  
    getCorners() {
        const axis = this.getAxis();
        const RX = axis[0].direction.Multiply(this.size.x / 2);
        const RY = axis[1].direction.Multiply(this.size.y / 2);
        return [
            this.center.Add(RX).Add(RY),
            this.center.Add(RX).Add(RY.Multiply(-1)),
            this.center.Add(RX.Multiply(-1)).Add(RY.Multiply(-1)),
            this.center.Add(RX.Multiply(-1)).Add(RY),
        ];
    }
}