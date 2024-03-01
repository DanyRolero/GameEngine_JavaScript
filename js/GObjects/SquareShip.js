class SquareShip extends GObject{
    speed = 0.1;

    update() {
        this.up();
    }

    up() {
        if(keyboard.key('ArrowUp')){
            this.y -= (this.speed * time.deltaTime);
        }
    }

    draw() {
        graphics.fillRect({x: this.x, y: this.y, width: this.width, height: this.height, color: 'green'});
    }


}