export let canvasAPI = function (canvasID) {

    // Variables del canvas  
    const canvas = document.getElementById(canvasID);
    const context = canvas.getContext("2d");

    // Variables para cargar imágenes  
    let imgTotal = 0;
    let imgIndex = 0;
    let imagenes = [];
    let imgCallback = null;

    // Funciones de ayuda  

    //----------------------------------------------------------------------------------------------------
    /// Escalar un objeto: escala > 0 aumenta; escala < 0 disminuye;
    function scale(obj, x, y) { 
        obj.width = obj.width + obj.width * x;
        obj.height = obj.height + obj.height * y;
        obj.radius = obj.radius + obj.radius * x;
    }

    //----------------------------------------------------------------------------------------------------
    function rotate(obj, deg) { 
        let x = obj.x + (obj.width >> 1);
        let y = obj.y + (obj.height >> 1);
        context.translate(x,y);
        context.rotate(this.radians(deg));
        context.translate(-x,-y);
    }

    //----------------------------------------------------------------------------------------------------
    /// Obtener cantidad de radianes a partir de una cantidad de grados
    function radians(degrees) { 
        return degrees * (Math.PI/180);
    }

    //----------------------------------------------------------------------------------------------------
    function opacity(opacity) { 
        context.globalAlpha = opacity;
    }

    //----------------------------------------------------------------------------------------------------
    function clearScreen() { 
        context.clearRect(0,0, canvas.width, canvas.height);
    }

    //----------------------------------------------------------------------------------------------------
    function resetTransform() {
        context.globalAlpha = 1;
        context.resetTransform();
     }

    //----------------------------------------------------------------------------------------------------
    function top(obj) { return obj.y; }
    function right(obj) { return obj.x + obj.width; }
    function bottom(obj) { return obj.y + obj.height }
    function left(obj) { return obj.x; }


    //----------------------------------------------------------------------------------------------------
    function outOfCanvas(obj, side) {
        switch (side) {
            case "Top": return (bottom(obj) < 0);
            case "Left": return (right(obj) < 0);
            case "Right": return (left(obj) > canvas.width);
            case "Bottom": return (top(obj) > canvas.height);        
            default: return (right(obj) < 0 
                          || left(obj) > canvas.width 
                          || bottom(obj) < 0 
                          || top(obj) > canvas.height);

        }
     }

    //----------------------------------------------------------------------------------------------------
    /// Verifica si los 4 lados del obj1 estan fuera del obj2
    /// Verificación previa para descartar colisiones rápidamente
    function collision(obj1, obj2) {
        return !(right(obj1) < left(obj2) && left(obj1) > right(obj2) && bottom(obj1) < top(obj2) && top(obj1) > bottom(obj2));
    }
    
    //----------------------------------------------------------------------------------------------------
    /// Verifica si hay colisión usando una hitbox ovalada
    function hit(obj1, obj2) {
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
    /// Crear rectangulo relleno
    function fillRect(data) {
        context.beginPath();
        context.fillStyle = data.color;
        context.fillRect(data.x, data.y, data.width, data.height);
        context.closePath();


    }

    //----------------------------------------------------------------------------------------------------
    /// Dibujar linea 
    function line(data) {
        context.beginPath();
        context.lineWidth = data.lineWidth || 1;
        context.lineCap = data.lineCap || 'butt';   //butt  square  round
        context.strokeStyle = data.color || 'white';
        context.setLineDash(data.lineDash || []);
        context.moveTo(data.x1, data.y1);
        context.lineTo(data.x2, data.y2);
        context.stroke();
        context.closePath();
    }

    //----------------------------------------------------------------------------------------------------
    /// Crear contorno
    function strokeRect(data) {
        context.lineJoin = data.lineJoin;
        context.lineWidth = data.lineWidth;
        context.strokeStyle = data.color;
        context.beginPath();
        context.strokeRect(data.x, data.y, data.width, data.height);
        context.closePath();
    }

    //----------------------------------------------------------------------------------------------------
    /// circulo
    function fillCircle (data) {
        this.x = data.x;
        this.y = data.y;
        this.color = data.color || 'white';
        this.radius = data.radius;
        this.width = data.radius << 1;
        this.height = this.width;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }

    //----------------------------------------------------------------------------------------------------
    /// Elipse
    function fillEllipse (data) {
        this.x = data.x;
        this.y = data.y;
        this.color = data.color;
        this.width = data.width;
        this.height = data.height;
        context.fillStyle = this.color;
        context.beginPath();
        context.ellipse(this.x + this.width/2, this.y + this.height/2, this.width/2, this.height/2, 0, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }

    //----------------------------------------------------------------------------------------------------
    //Crear polígono (relleno)
    function fillPoly(data) {
        this.x = data.x;
        this.y = data.y;
        this.color = data.color;
        this.width = data.width;
        this.height = data.height
        this.vertex = data.vertex;

        var x = this.x + this.vertex[0].x;
        var y = this.y + this.vertex[0].y;
        context.beginPath();
        context.moveTo(x, y);

        for (let i = 1; i < this.vertex.length; i++) {
            x += this.vertex[i].x;
            y += this.vertex[i].y;
            context.lineTo(x, y);
        }

        context.fillStyle = this.color;
        context.fill();
        context.closePath();

    }
    


    //----------------------------------------------------------------------------------------------------
    function load(name, url, callback) {
        imgTotal++;
        if(callback) imgCallback = callback;
        let img = new Image();

        img.onload = function() {
            imgIndex++;
            if(imgTotal == imgIndex) imgCallback();
        }

        img.src = url;
        imagenes[name] = img;
    }

    //----------------------------------------------------------------------------------------------------
    function img(name) { 
        if(imagenes[name]) return imagenes[name];
        alert('ERROR: calling unknown image name' + name);
    }

    //----------------------------------------------------------------------------------------------------
    function text(data) {
            let text = data.text;
            let x = data.x || canvas.width >> 1;
            let y = data.y || canvas.height >> 1;
            let width = data.width || undefined;
            
            context.strokeStyle = data.color || 'white';
            context.textAlign = data.align || 'center';
            context.font = (data.size || "60px") + ' ' + (data.font || 'Arial');
            context.strokeText(text, x, y, width);
    }

    //----------------------------------------------------------------------------------------------------
    function fillText(data) {
        let text = data.text;
        let x = data.x || canvas.width >> 1;
        let y = data.y || canvas.height >> 1;
        let width = data.width || undefined;
        
        context.fillStyle = data.color || 'white';
        context.textAlign = data.align || 'center';
        context.font = (data.size || "60px") + ' ' + (data.font || 'Arial');
        context.fillText(text, x, y, width);        
    }

    //----------------------------------------------------------------------------------------------------
    /// Función constructora de un botón
    function btn(data) { 
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.op = data.opacity || 1;
        this.radius = data.radius || 8;
        this.color = data.color || 'black';

        context.lineWidth = data.lineWidth || 4;
        if(this.width < (2 * this.radius)) this.radius = this.width >> 1;
        if(this.height < (2 * this.radius)) this.radius = this.height >> 1;

        context.beginPath();
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.radius, this.y);
        context.arcTo(right(this), top(this), right(this), bottom(this), this.radius);
        context.arcTo(right(this), bottom(this), left(this), bottom(this), this.radius);
        context.arcTo(left(this), bottom(this), left(this), top(this), this.radius);
        context.arcTo(left(this), top(this), right(this), top(this), this.radius);
        
        opacity(this.op);
        context.stroke();
        resetTransform();
    }

    //----------------------------------------------------------------------------------------------------
    function fillBtn(data) { 
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.op = data.opacity || 1;
        this.radius = data.radius || 8;
        this.color = data.color || 'black';

        if(this.width < (2 * this.radius)) this.radius = this.width >> 1;
        if(this.height < (2 * this.radius)) this.radius = this.height >> 1;
        
        context.beginPath();
        context.fillStyle = this.color;

        context.moveTo(this.x + this.radius, this.y);
        context.arcTo(right(this), top(this), right(this), bottom(this), this.radius);
        context.arcTo(right(this), bottom(this), left(this), bottom(this), this.radius);
        context.arcTo(left(this), bottom(this), left(this), top(this), this.radius);
        context.arcTo(left(this), top(this), right(this), top(this), this.radius);
        
        opacity(this.op);
        context.fill();
        resetTransform();        
    }

    //----------------------------------------------------------------------------------------------------
    function fullBtn(data) { 
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.op = data.opacity || 1;
        this.color = data.color || 'black';
        this.fColor = data.fColor || 'white';
        this.radius = data.radius || 8;

        context.lineWidth = data.lineWidth || 4;
        if(this.width < (2 * this.radius)) this.radius = this.width >> 1;
        if(this.height < (2 * this.radius)) this.radius = this.height >> 1;
        
        context.beginPath();
        context.fillStyle = this.fColor;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.radius, this.y);
        context.arcTo(right(this), top(this), right(this), bottom(this), this.radius);
        context.arcTo(right(this), bottom(this), left(this), bottom(this), this.radius);
        context.arcTo(left(this), bottom(this), left(this), top(this), this.radius);
        context.arcTo(left(this), top(this), right(this), top(this), this.radius);
        
        opacity(this.op);
        context.fill();
        context.stroke();
        resetTransform();           
    }

    //----------------------------------------------------------------------------------------------------
    function addData(obj, params) { 
        for(let key in params) {
            Object.defineProperty(obj, key, {
                value: params[key],
                writable: true,
                configurable: true,
                enumerable: true
            });
        }
    }

    // IMAGE
    //----------------------------------------------------------------------------------------------------
    function image(data) { 
        addData(this, data);
    }
    //----------------------------------------------------------------------------------------------------
    image.prototype.draw = function () { 
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    // TILE
    //----------------------------------------------------------------------------------------------------
    function tile(data) { 
        addData(this, data);
    }
    //----------------------------------------------------------------------------------------------------
    tile.prototype.draw = function () { 
        context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height);
    }


    // SPRITE
    //----------------------------------------------------------------------------------------------------
    function sprite(data) { 
        addData(this, data);
    }

    //----------------------------------------------------------------------------------------------------
    sprite.prototype.end = function () { 
        return (this.sx >= this.img.naturalWidth);
    }

    //----------------------------------------------------------------------------------------------------
    sprite.prototype.draw = function () { 
        if(this.sx >= this.img.naturalWidth) this.sx = 0;
        context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height);
        this.sx += this.sw;
    }

    // Parte pública de la librería  
    return {

        // Propiedades  
        width: canvas.width,
        height: canvas.height,

        // Funciones  
        scale: scale,
        rotate: rotate,
        radians: radians,
        opacity: opacity,
        clearScreen: clearScreen,
        resetTransform: resetTransform,
        outOfCanvas: outOfCanvas,
        collision: collision,
        hit: hit,
        load: load,
        img: img,
        text: text,
        fillText: fillText,
        line: line,
        fillRect: fillRect,
        strokeRect: strokeRect,
        fillCircle: fillCircle,
        fillEllipse: fillEllipse,
        fillPoly: fillPoly,
        btn: btn,
        fillBtn: fillBtn,
        fullBtn: fullBtn,
        image: image,
        tile: tile,
        sprite: sprite,
    }

}


