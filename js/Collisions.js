class Collisions {

    //----------------------------------------------------------------------------------------------------
    top(obj) { return obj.y; }
    right(obj) { return obj.x + obj.width; }
    bottom(obj) { return obj.y + obj.height }
    left(obj) { return obj.x; }
    xCenter(obj) { return obj.x + (obj.width >> 1) }
    yCenter(obj) { return obj.y + (obj.height >> 1) }

    //----------------------------------------------------------------------------------------------------
    // Usar con formas rectangulares con objetos que no van a rotar
    rectCollision(obj1, obj2) {
        return !(this.right(obj1) < this.left(obj2) 
        && this.left(obj1) > this.right(obj2) 
        && this.bottom(obj1) < this.top(obj2) 
        && this.top(obj1) > this.bottom(obj2));
    }

    //----------------------------------------------------------------------------------------------------
    // Usar con formás circulares para objetos que van a rotar
    // Usar con formas elípticas con objetos que NO van a rotar
    elypseCollision(obj1, obj2) {
        if(!collision(obj1,obj2)) return false;

        // Obj1
        let rw1 = obj1.width >> 1;
        let rh1 = obj1.height >> 1;
        let cx1 = obj1.x + rw1;
        let cy1 = obj1.y + rh1;

        // Obj2
        let rw2 = obj2.width >> 1;
        let rh2 = obj2.height >> 1;
        let cx2 = obj2.x + rw2;
        let cy2 = obj2.y + rh2;

        let rw = rw1 + rw2;
        let rh = rh1 + rh2;

        let hyp = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));

        return (hyp < Math.min(rw, rh));
    }

    //----------------------------------------------------------------------------------------------------
    // Renombrar apropiadamente
    // Verificar colisiones entre 2 rectangulos rotados
    lineProjectionCollision(obj1, obj2) {

    }



    // Verificar colisiones entre dos polígonos
}
