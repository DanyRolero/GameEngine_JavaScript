class MouseClass {
    
    //-----------------------------------------------------------------------------------------
    constructor(canvasID) {
        this.item = {x: null, y: null, button: null};
        this.aspectRatio = 1;
        this.canvas = document.getElementById('canvasID');
        this.onWindowResize();

        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    //-----------------------------------------------------------------------------------------
    //Establece el aspectRatio al cambiar el tamaño del canvas
    onWindowResize() {
        this.aspectRatio = this.canvas.width/this.canvas.clientWidth;
    }
    
    //-----------------------------------------------------------------------------------------
    //Establece el botón del ratón que se está pulsando 0 -> clic izq; 2 -> clic der;
    onMouseDown(event) {
        this.item.button = event.button;
    }
    
    //-----------------------------------------------------------------------------------------
    //Anula el botón del ratón cuando se suelta
    onMouseUp(event) {
        this.item.button = null;
    }
    
    //-----------------------------------------------------------------------------------------
    //Estable las coordenadas del cursor del ratón
    onMouseMove(event) {
        this.item.x = event.offsetX;
        this.item.y = event.offsetY;
    }

    //-----------------------------------------------------------------------------------------
    //Devuelve las coordenadas del cursor y el botón del ratón que se está pulsando
    getKeys() {
        return this.item;
    }
    
    //-----------------------------------------------------------------------------------------
    //Verifica si se está pulsando un determinado botón del ratón
    key(button) {
        return (this.item.button == button);
    }

    
    //-----------------------------------------------------------------------------------------
    //Establece un "tic" aunque se mantenga el botón del ratón pulsado
    click(button) {
        if(this.key(button)) {
            this.item.button = null;
            return true;
        }

        return false;
    } 

    //-----------------------------------------------------------------------------------------
    //Verifica si el cursor del ratón está pasando sobre un objeto
    hover(obj) {
        let x = this.item.x * this.aspectRatio;
        let y = this.item.y * this.aspectRatio;
        let onHover = ( (x > obj.x) && (x < obj.x + obj.width) && (y > obj.y) && (y < obj.y + obj.height) );

        if(onHover) document.body.style.cursor = 'Pointer';

        return onHover;
    }

}