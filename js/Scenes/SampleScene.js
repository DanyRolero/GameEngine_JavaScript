class SampleScene extends Scene {


    onLoad() {
        this.gobjects.push(new SquareShip(275, 550, 50, 50));
        this.gobjects.push(new GOTime());
    }

    onChange() {
        this.gobjects = [];
    }

}