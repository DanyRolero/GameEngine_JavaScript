class GObject {
    constructor(x = 0, y = 0, width = 1, height = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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