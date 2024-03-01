class AudioClass {

    //-----------------------------------------------------------------------------------------
    constructor() {
        this.item = [];
        this.library = [];
    }
    
    //-----------------------------------------------------------------------------------------
    //Detiene la reproducción de todos los sonidos
    stopAll() {
        for(let sound in this.library) this.stop(sound);
    }
    
    //-----------------------------------------------------------------------------------------
    //Verifica si todos los sonidos están preparados para ser reproducidos
    allReady() {
        for(let sound in this.library) {
            if(this.library[sound].readyState != 4) return false;
        } 
        return true;
    }
    //-----------------------------------------------------------------------------------------
    //Carga y añade un sonido a la biblioteca de sonidos
    load(sound, url, volume, loop) {
        this.library[sound] = new Audio(url);
        if(loop != undefined) this.library[sound].loop = loop;
        if(volume != undefined) this.library[sound].volume = volume;
    }
    
    //-----------------------------------------------------------------------------------------
    //Cambia el volumen de un sonido
    volume(sound, value) {
        this.library[sound].volume = this.volume;
    }
    
    //-----------------------------------------------------------------------------------------
    //Activa o desactiva la reporducción en bucle de un sonido
    loop(sound, value) {
        this.library[sound].loop = loop;
    }
    
    //-----------------------------------------------------------------------------------------
    //Reproduce un sonido
    play(sound) {
        this.library[sound].play();
    }
    
    //-----------------------------------------------------------------------------------------
    //Pausa la reproducción de un sonido
    pause(sound) {
        this.library[sound].pause();
    }
    
    //-----------------------------------------------------------------------------------------
    //Detiene la reproducción de un sonido
    stop(sound) {
        this.library[sound].pause();
        this.library[sound].currentTime = 0;
    }
    
    //-----------------------------------------------------------------------------------------
    //Reiniciar la reproducción de un sonido
    restart(sound) {
        this.library[sound].stop(sound);
        this.library[sound].play();
    }

    //-----------------------------------------------------------------------------------------
    //Clona sonidos para permitir su reprodución simultánea; (recom 200 delay)
    clone(sound, delay) {
        if(!this.library[sound].time)this.library[sound].time = Date.now() - delay;
        if(Date.now() - this.library[sound].time < delay) return;
        this.library[sound].time = Date.now();
        this.item.push(this.library[sound].cloneNode());

        this.item[this.item.length - 1].volume = this.library[sound].volume;
        this.item[this.item.length - 1].loop = this.library[sound].loop;
        this.item[this.item.length - 1].play();

        for(let i = 0; i < this.item.length; i++) {
            if(this.item[i].ended) this.item.splice(i,1);
        }
    }

}