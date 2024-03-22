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
    isCollision(obj1, obj2) {
                if (this.left(obj1) > this.right(obj2)) return false;
                if (this.right(obj1) < this.left(obj2)) return false;
                if (this.top(obj1) > this.bottom(obj2)) return false;
                if (this.bottom(obj1) < this.top(obj2)) return false;
                return true;
    }


    //----------------------------------------------------------------------------------------------------
    // Verificar previamente que los objetos no puedan estar colisionando por estar alineado vertical u horizontalmente
    checkPossibleCollision(obj1, obj2) {
        return  !((this.right(obj1) < this.left(obj2) || this.left(obj1) > this.right(obj2)) && 
                 (this.bottom(obj1) < this.top(obj2) || this.top(obj1) > this.bottom(obj2)));
    }


    //-----------------------------------------------------------------------------------------------------
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
    isCollision2(obj1, obj2) {
        if(!this.checkPossibleCollision(obj1,obj2))return;
        return (this.horizontalCollision(obj1, obj2) && this.verticalCollision(obj1, obj2));
    }


    //----------------------------------------------------------------------------------------------------
    // Una vez se ha producido la colisión, verificar si ha sido en la parte superior
    isCollisionOnTopSide(obj1, obj2) {
        return (this.top(obj1) < this.top(obj2));
    }

    //----------------------------------------------------------------------------------------------------
    // Una vez se ha producido la colisión, verificar si ha sido en la parte superior
    isCollisionOnBottomSide(obj1, obj2) {
        return (this.bottom(obj1) > this.bottom(obj2));
    }

        //----------------------------------------------------------------------------------------------------
    // Una vez se ha producido la colisión, verificar si ha sido en la parte superior
    isCollisionOnLeftSide(obj1, obj2) {
        return (this.left(obj1) < this.left(obj2));
    }

        //----------------------------------------------------------------------------------------------------
    // Una vez se ha producido la colisión, verificar si ha sido en la parte superior
    isCollisionOnRightSide(obj1, obj2) {
        return (this.right(obj1) > this.right(obj2));
    }
}
