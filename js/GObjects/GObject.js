export default class GObject {
    constructor(data) {
        this.x = data.x || 0;
        this.y = data.y || 0;
        this.width = data.width || 1;
        this.height = data.height || 1;
        this.angle = data.angle || 0;
        this.scene = data.scene || null;
    }

    //onLoad() {}

    // Abstracta
    // Aquí se realizan las acciones del GOject durante cada fotograma
    update() {} 
    
    // Abstracta
    // Aquí se llama al objeto graphics para visualizar el objeto en el juego
    draw() {} 

    // onDestroy(){}

}