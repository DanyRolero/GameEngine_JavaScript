export default class KeyboardClass {

    //-----------------------------------------------------------------------------------------
    //Inicializa los eventos de teclado
    constructor() {
        this.item = [];
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    //-----------------------------------------------------------------------------------------
    //Registra una tecla cuando se está pulsando
    onKeyDown(event) {
        let preventKeys = ['Escape', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        if(preventKeys.indexOf(event.key) > -1) event.preventDefault();
        if(this.item.indexOf(event.key) < 0) this.item.push(event.key);
    }

    //-----------------------------------------------------------------------------------------
    //Elimina del registro una tecla cuando se deja de pulsar
    onKeyUp(event) {
        let i = this.item.indexOf(event.key);
        if(i > -1) this.item.splice(i,1);
    }

    //-----------------------------------------------------------------------------------------
    //Devuelve el listado de las teclas que se están pulsando
    getKeys() {
        return this.item;
    }

    //-----------------------------------------------------------------------------------------
    //Limita a un "tic" la pulsación de una tecla
    click(key) {
        let i = this.item.indexOf(key);
        if(i > -1) this.item.splice(i, 1);
        return (i > -1);
    }

    //-----------------------------------------------------------------------------------------
    //Verificar si una tecla se está pulsando
    key(key) {
        return this.item.indexOf(key) > -1;
    }
}