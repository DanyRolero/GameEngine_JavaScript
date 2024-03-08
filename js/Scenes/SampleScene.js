class SampleScene extends Scene {
    images = [];

    onLoad() {
        this.gobjects.push(new SquareShip(275, 550, 50, 50));
        //this.gobjects.push(new GOTime());

        let imgLoader = new ImageLoader();  
        this.images['img1'] = imgLoader.loadImage('./img/sample1.png');
        this.images['img2'] = imgLoader.loadImage('./img/sample2.png');
        this.images['img3'] = imgLoader.loadImage('./img/sample3.png', game.play.bind(game));
    }

    onChange() {
        this.gobjects.length = 0;
        this.images.length = 0;
    }
}