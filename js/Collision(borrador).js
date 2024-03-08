/*
    // Estructuras: Puntos, líneas, rectángulos
    // Rotaciones: trigonometría, hypotenusa
    // Puntos: 


*/



//----------------------------------------------------------------------------------------------------
// Puntos
//----------------------------------------------------------------------------------------------------
class Vector {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    //----------------------------------------------------------------------------------------------------
    rotate(degrees) {
        switch (degrees) {
            case 90 || -270: return new Vector({ x: -this.y, y: this.x });
            case 180 || -180: return new Vector({x: -this.x, y: -this.y});
            case 270 || -90: return new Vector({x: this.y, y: -this.x});
            case 0 || 360: return new Vector({x: this.x, y: this.y});
        
            default:
                let theta = degrees * Math.PI / 180;
                // https://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions
                return new Vector(
                    this.x * Math.cos(theta) - this.y * Math.sin(theta),
                    this.x * Math.sin(theta) + this.y * Math.cos(theta),
                );
        }
    }

    //----------------------------------------------------------------------------------------------------
    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    //----------------------------------------------------------------------------------------------------
    minus(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

}

//----------------------------------------------------------------------------------------------------
// Lineas
//----------------------------------------------------------------------------------------------------
class Line {
    constructor(oVector, dVector) {
        this.origin = oVector;
        this.direction = dVector;
    }

    // Ecuación de la recta y a partir de x


    // Ecuación de la recta x a partir de y
}

//----------------------------------------------------------------------------------------------------
// Rectángulos
// Crea un rectángulo a partir de un gobject
class Rect {
    constructor(gobject) {
        this.x = gobject.x;
        this.y = gobject.y;
        this.w = gobject.width;
        this.h = gobject.height;
        this.angle = gobject.angle;
        
        this.center = new Vector(this.x + this.w >> 1, this.y + this.h >> 1);
        this.corners = [
            new Vector(this.x, this.y),
            new Vector(this.x + this.w, this.y),
            new Vector(this.x, this.y + this.h),
            new Vector(this.x + this.w, this.y + this.h)
        ];

        this.middleSides = [
            new Vector(this.center.x, this.y),
            new Vector(this.center.x, this.y + this.h),
            new Vector(this.x + this.w,  this.center.y),
            new Vector(this.x, this.center.y)
        ];

        for(let i = 0; i < 4; i++) {
            this.corners[i] = this.corners[i].minus(this.center);
            this.corners[i] = this.corners[i].rotate(this.angle);
            this.corners[i] = this.corners[i].add(this.center);
            this.middleSides[i] = this.middleSides[i].minus(this.center);
            this.middleSides[i] = this.middleSides[i].rotate(this.angle);
            this.middleSides[i] = this.middleSides[i].add(this.center);
        }

    }
    
    getAxis() {
        const OX = new Vector(1, 0);
        const OY = new Vector(0, 1);
        const RX = OX.rotate(this.angle);
        const RY = OY.rotate(this.angle);
        return [
          new Line(this.center, new Vector(RX.x, RX.y)),
          new Line(this.center, new Vector(RY.x, RY.y))
        ];
      }
    
    getAxis2(){
        return [
            new Line(this.middleSides[0],this.middleSides[1]),
            new Line(this.middleSides[2], this.middleSides[3])
        ]
    }

}

class Collision3 {
    isCollision(rect1, rect2) {
        return true;
    }
}

/* 
- Comenzamos por calcular los vectores del rectangulo antes de ser rotado
- Obtener 9 puntos del rectangulo
    - Obtener centro
    - 4 esquinas
    - 4 extremos de los ejes

- Rotar los puntos en relación al centro del rectángulo
    - Restar centro a cada punto
    - Rotar cada punto
    - Sumar centro a cada punto

- Obtener ejes (líneas) que cortan por la mitad al rectángulo horizontal y verticalmente
    - Sabemos que el primer eje es el que corta verticalmente y su ángulo es el mismo ángulo que
    el del rectángulo.
    - Sabemos que el segundo eje es el que corta el rectángulo horizontalmente y tiene el mísmo angulo que el rectángulo + 90 grados


- Obtener la esquina con la min x.
- Obtener la esquina con la max x.

- Obtener la esquina con la min y.
- Obtener la esquina con la max y.


- Proyección
    - Que dos puntos proyectan una línea perpendicular sobre cada eje del otro rectángulo
    - Proyectar puntos sobre un eje permite saber si dos líneas están superpuestas

- Matemáticas
    - Ecuación de la recta?
    - Producto escalar
        - Multiplicar vectores y sumar componentes
        - Producto de factores por coseno -> permite obtener el ángulo a partir de los dos vectores
        - Calcular angulo entre dos vectores
    - Operaciones con vectores

*/
