export default class ImageLoader {
    constructor() {
        this.imgIndex = 0;
        this.totalImages = 0;
    }

    loaded = function(callback) {
        this.imgIndex++;
        if(!callback) return;
        if(this.imgIndex == this.totalImages && callback) callback();
    }
    

    //---------------------------------------------------------------------
    loadImage(url, callback) {
        this.totalImages++;
        var img = new Image();
        img.src = url;

        img.onload = this.loaded.bind(this, callback);
    }

    //---------------------------------------------------------------------
    streamLoadImage(url) {
        game.pause();
        this.loadImage(url, game.play.bind(game));
    }

    //---------------------------------------------------------------------
    //Añadir funcionalidad para mostrar progreso de la carga de imágenes
}