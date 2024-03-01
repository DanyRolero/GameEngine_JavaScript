class Time {
    fps = 0;
    cicle = 0;
    time = performance.now();
    lastFrameTime = performance.now();
    deltaTime = 0;

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