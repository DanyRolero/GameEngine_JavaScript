export default class CollisionsRect {

    //----------------------------------------------------------------------------------------------------
    top(obj) { return obj.y; }
    right(obj) { return obj.x + obj.width; }
    bottom(obj) { return obj.y + obj.height }
    left(obj) { return obj.x; }
    xCenter(obj) { return obj.x + (obj.width >> 1) }
    yCenter(obj) { return obj.y + (obj.height >> 1) }

    //----------------------------------------------------------------------------------------------------
    // Verificar previamente que los objetos no puedan estar colisionando por estar alineado vertical u horizontalmente
    checkPossibleCollision(obj1, obj2) {
        return  !((this.right(obj1) < this.left(obj2) || this.left(obj1) > this.right(obj2)) && 
                 (this.bottom(obj1) < this.top(obj2) || this.top(obj1) > this.bottom(obj2)));
    }


    //----------------------------------------------------------------------------------------------------
    horizontalCollision(obj1, obj2) {   
        return (this.left(obj1) > this.left(obj2) && this.left(obj1) < this.right(obj2)) ||
        (this.right(obj1) > this.left(obj2) && this.right(obj1) < this.right(obj2))
    }

    //----------------------------------------------------------------------------------------------------
    verticalCollision(obj1, obj2) {   
        return (this.top(obj1) > this.top(obj2) && this.top(obj1) < this.bottom(obj2)) ||
        (this.bottom(obj1) > this.top(obj2) && this.bottom(obj1) < this.bottom(obj2))
    }

    //----------------------------------------------------------------------------------------------------
    isCollision(obj1, obj2) {
        if(!this.checkPossibleCollision(obj1,obj2))return;
        return (this.horizontalCollision(obj1, obj2) && this.verticalCollision(obj1, obj2));
    }

    //----------------------------------------------------------------------------------------------------
    // TO DO - Obtener información para registrar donde se ha producido la colision
    // Refactorizar en funciones que verifique colisiones desde cada lado
}
