class GOTime extends GObject{
    update() {

    }

    draw() {
        graphics.fillText({x:50, y:50, text: time.deltaTime, color: 'red'});
        graphics.text({x:50, y:50, text: time.deltaTime, color: 'white'});
    }








    //---------------------------------------------------------------------------------------------------
    countFPS() {
        if (performance.now() - this.time > 1000) {
            this.time = performance.now();
            this.fps = this.cicle;
            this.cicle = 0;
            return;
        }
            this.cicle++;
    }

    //---------------------------------------------------------------------------------------------------
    countDeltaTime() {
        this.deltaTime = performance.now() - this.lastFrameTime;
        this.lastFrameTime = performance.now();
    } 
}