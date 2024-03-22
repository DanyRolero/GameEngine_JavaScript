import Rect from "./Utils/Rect.js";

export default class CollisionsRotatedRect {

    //----------------------------------------------------------------------------------------------------
    top(obj) { return obj.y; }
    right(obj) { return obj.x + obj.width; }
    bottom(obj) { return obj.y + obj.height }
    left(obj) { return obj.x; }

    //----------------------------------------------------------------------------------------------------
    // Verificar previamente que los objetos no puedan estar colisionando por estar alineado vertical u horizontalmente
    checkPossibleCollision(obj1, obj2) {
        return  !((this.right(obj1) < this.left(obj2) || this.left(obj1) > this.right(obj2)) && 
                 (this.bottom(obj1) < this.top(obj2) || this.top(obj1) > this.bottom(obj2)));
    }

    //----------------------------------------------------------------------------------------------------
    isCollision(gobjectA, gobjectB) {
        if(!this.checkPossibleCollision(gobjectA, gobjectB)) return;
        return this.isRectCollide(new Rect(gobjectA), new Rect(gobjectB));
    }

    //--------------------------------------------------------------------------------------------------------------
    isRectCollide(rA, rB) {
        return (this.isProjectionCollide({ rect: rA, onRect: rB }) && this.isProjectionCollide({ rect: rB, onRect: rA }));
    }   

    //--------------------------------------------------------------------------------------------------------------
    isProjectionCollide = ({ rect, onRect }) => {
        const lines = onRect.getAxis();
        const corners = rect.getCorners();

        let isCollide = true;

        lines.forEach((line, dimension) => {
            let futhers = { min: null, max: null };
            // Size of onRect half size on line direction
            const rectHalfSize = (dimension === 0 ? onRect.size.x : onRect.size.y) / 2;
      
            corners.forEach((corner) => {
                const projected = corner.Project(line);
                const CP = projected.Minus(onRect.center);
                // Sign: Same directon of OnRect axis : true.
                const sign = CP.x * line.direction.x + CP.y * line.direction.y > 0;
                const signedDistance = CP.magnitude * (sign ? 1 : -1);

                if (!futhers.min || futhers.min.signedDistance > signedDistance) {
                    futhers.min = { signedDistance, corner, projected };
                }
        
                if (!futhers.max || futhers.max.signedDistance < signedDistance) {
                    futhers.max = { signedDistance, corner, projected };
                }
            });

            if (
              !(
                (futhers.min.signedDistance < 0 &&
                  futhers.max.signedDistance > 0) ||
                Math.abs(futhers.min.signedDistance) < rectHalfSize ||
                Math.abs(futhers.max.signedDistance) < rectHalfSize
              )
            ) {
              isCollide = false;
            }
        }
    );
    
            return isCollide;
    };
}
