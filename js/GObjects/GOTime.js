import GObject from "./GObject.js";
import { graphics } from "../main.js";
import { time } from "../main.js";


export default class GOTime extends GObject{
    draw() {
        graphics.fillText({x:50, y:50, text: time.deltaTime, color: 'red'});
        graphics.text({x:50, y:50, text: time.deltaTime, color: 'white'});
        graphics.fillText({x:50, y:150, text: time.fps, color: 'red'});
        graphics.text({x:50, y:150, text: time.fps, color: 'white'});
    }
}