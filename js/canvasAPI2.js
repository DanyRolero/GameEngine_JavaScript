var canvasAPI = function (strCanvasId) {
    var canvas = document.getElementById(strCanvasId);
    var context = canvas.getContext('2d');

    var imgTotal = 0;
    var imgIndex = 0;
    var imgCallback = null;



    //============================================================================================
    //RECTANGULOS
    //============================================================================================
    //Crear rectangulo (contorno)
    this.rectangle = function (data) {
        this.x = data.x;
        this.y = data.y;
        this.color = data.color;
        this.width = data.width;
        this.height = data.height
    }

    //Dibujar rectangulo
    this.rectangle.prototype.draw = function () {
        context.strokeStyle = this.color;
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
    }

    //Crear rectangulo relleno
    this.fillRect = function (data) {
        this.x = data.x;
        this.y = data.y;
        this.color = data.color;
        this.width = data.width;
        this.height = data.height
    }

    //Dibujar rectangulo relleno
    this.fillRect.prototype.draw = function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }



    //============================================================================================
    //CIRCULOS
    //============================================================================================
    //Crear círculo (contorno)
    this.circle = function (data) {
        this.x = data.x;
        this.y = data.y;
        this.color = data.color;
        this.radius = data.radius;
        this.width = data.radius << 1;
        this.height = this.width;

    }

    //Dibujar círculo(contorno)
    this.circle.prototype.draw = function () {
        context.strokeStyle = this.color;
        context.beginPath();
        context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
        context.stroke();
    }

    //Crear circulo (relleno)
    this.fillCircle = function (data) {
        this.x = data.x;
        this.y = data.y;
        this.color = data.color;
        this.radius = data.radius;
        this.width = data.radius << 1;
        this.height = this.width;

    }

    //Dibujar círculo(relleno)
    this.fillCircle.prototype.draw = function () {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
        context.fill();



    }



    //============================================================================================
    //TEXTO
    //============================================================================================
    //Crear y escribir texto (contorno)
    this.text = function (data) {
        var text = data.text;
        var size = data.size || "60px";
        var font = data.font || "Arial";
        var color = data.color || "white";
        var align = data.align || "center";
        var x = data.x || canvas.width / 2;
        var y = data.y || canvas.height / 2;
        var width = data.width || undefined;
        context.strokeStyle = color;
        context.textAlign = align;
        context.font = size + " " + font;
        context.strokeText(text, x, y, width);
    }

    //Crear y escribir texto (relleno)
    this.fillText = function (data) {
        var text = data.text;
        var size = data.size || "60px";
        var font = data.font || "Arial";
        var color = data.color || "white";
        var align = data.align || "center";
        var x = data.x || canvas.width / 2;
        var y = data.y || canvas.height / 2;
        var width = data.width || undefined;
        context.fillStyle = color;
        context.textAlign = align;
        context.font = size + " " + font;
        context.fillText(text, x, y, width);
    }



    //============================================================================================
    //POLIGONOS
    //============================================================================================
    //Crear polígono (contorno)
    this.polygon = function (data) {
        this.x = data.x;
        this.y = data.y;
        this.color = data.color;
        this.width = data.width;
        this.height = data.height
        this.vertex = data.vertex;
    }

    //Dibujar polígono (contorno)
    this.polygon.prototype.draw = function () {
        var x = this.x + this.vertex[0].x;
        var y = this.y + this.vertex[0].y;
        context.beginPath();
        context.moveTo(x, y);

        for (let i = 1; i < this.vertex.length; i++) {
            x += this.vertex[i].x;
            y += this.vertex[i].y;
            context.lineTo(x, y);
        }

        context.strokeStyle = this.color;
        context.stroke();
    }

    //Crear polígono (relleno)
    this.fillPoly = function (data) {
        this.x = data.x;
        this.y = data.y;
        this.color = data.color;
        this.width = data.width;
        this.height = data.height
        this.vertex = data.vertex;
    }

    //Dibujar polígono (relleno)
    this.fillPoly.prototype.draw = function () {
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
    }



    //============================================================================================
    //IMAGENES
    //============================================================================================
    //Cargar una imagen (añade a la cola) y llamar a funcion opcinal cuando se hallan cargado todas
    this.load = function (url, callback) {
        imgTotal++;
        if (callback) imgCallback = callback;
        var img = new Image();
        img.src = url;

        img.onload = function () {
            imgIndex++;
            if (imgTotal == imgIndex) imgCallback();
            console.log('Imagen cargada');
        }
        return img;
    }

    //Crear una imagen
    this.image = function (data) {
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.img = data.img;
    }

    //Dibujar imagen
    this.image.prototype.draw = function () {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);

    }



    //============================================================================================
    //TILEMAPS
    //============================================================================================
    //Crear un tile a partir de una imagen
    this.tile = function (data) {
        this.x = data.x;
        this.y = data.y;
        this.sx = data.sx;
        this.sy = data.sy;
        this.sw = data.sw;
        this.sh = data.sh;
        this.img = data.img;
        this.width = data.width;
        this.height = data.height;
    }

    //Dibujar tile
    this.tile.prototype.draw = function () {
        context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height);
    }



    //============================================================================================
    //SPRITES (falta implementar velocidad de animación o similar)
    //============================================================================================
    //Crear sprite
    this.sprite = function (data) {
        this.x = data.x;
        this.y = data.y;
        this.sx = data.sx;
        this.sy = data.sy;
        this.sw = data.sw;
        this.sh = data.sh;
        this.img = data.img;
        this.width = data.width;
        this.height = data.height;
    }

    //Comprobar el fin de la animación
    this.sprite.prototype.end = function () {
        return (this.sx >= this.img.naturalWidth);
    }

    //Dibujar el fotograma actual del sprite
    this.sprite.prototype.draw = function () {
        if (this.sx >= this.img.naturalWidth) this.sx = 0;
        context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height);
        this.sx += this.sw;
    }



    //============================================================================================
    //INTERFAZ
    //============================================================================================
    //Crear botón
    this.btn = function (data) {
        this.x = data.x || 0;
        this.y = data.y || 0;
        this.width = data.width || 0;
        this.height = data.height || 0;
        this.color = data.color || "#ffffff";
        this.radius = data.radius || 8;
        this.op = data.opacity || 1;
        if (this.width < 2 * this.radius) this.radius = this.width / 2;
        if (this.height < 2 * this.radius) this.radius = this.height / 2;

        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(this.x + this.radius, this.y);
        context.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.height, this.radius);
        context.arcTo(this.x + this.width, this.y + this.height, this.x, this.y + this.height, this.radius);
        context.arcTo(this.x, this.y + this.height, this.x, this.y, this.radius);
        context.arcTo(this.x, this.y, this.x + this.width, this.y, this.radius);
        opacity(this.op);
        context.fill();
        resetTransform();

    }



    //============================================================================================
    //TRANSFORMAR IMÁGENES
    //============================================================================================
    //Escalar un objeto gráfico (x e y requiere valores decimales 0.25 -> +25%; -0.25 -> -25%)
    this.scale = function (x, y, obj) {
        obj.width += obj.width * x;
        obj.height += obj.height * y;
        obj.radius += obj.radius * x;
    }

    //Rotar un objeto gráfico(cambiar origen del canvas al centro del objeto a rotar, rotar y reestablecer origen)
    this.rotate = function (degree, obj) {
        let x = obj.x + (obj.width >> 1);
        let y = obj.y + (obj.height >> 1);
        context.translate(x, y);
        context.rotate(Math.PI / 180 * degree);
        context.translate(-x, -y);
    }

    //Cambiar opacidad (1 -> opaco, 0 -> transparente)
    function opacity(opacity) {
        context.globalAlpha = opacity;
    }

    //Eliminar transformación
    function resetTransform() {
        context.globalAlpha = 1;
        context.resetTransform();
    }






    //============================================================================================
    //FUNCIONES DE AYUDA
    //============================================================================================
    //BORRAR CANVAS
    this.clearScreen = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);

    }

    //Convertir grados en radianes (no aplicar a rotate)
    this.radians = function (degrees) {
        return degrees * (Math.PI / 180);
    }

    //Comprobar si un objeto esta fuera del canvas
    this.outOfCanvas = function (obj, side) {
        switch (side) {
            case "Top": return ((obj.y + obj.height) < 0);
            case "Left": return ((obj.x + obj.width) < 0);
            case "Right": return (obj.x > canvas.width);
            case "Bottom": return (obj.y > canvas.height);
            default: return ((obj.y + obj.width) < 0 || obj.x > canvas.width || (obj.y + obj.height) < 0 || obj.y > canvas.height);
        }
    }

    //Comprobar si un objeto esta fuera del canvas
    this.edgesOfCanvas = function (obj, side) {
        switch (side) {
            case "Top": return ((obj.y) < 0);
            case "Left": return ((obj.x) < 0);
            case "Right": return (obj.x + obj.width > canvas.width);
            case "Bottom": return (obj.y + obj.height > canvas.height);
            default: return (obj.y < 0 || obj.y < 0 || obj.x + obj.width > canvas.width || obj.y + obj.height > canvas.height);
        }
    }


    //Detectar colisiones (comprobación rápida inicial)
    this.collision = function (obj1, obj2) {
        return !(obj1.x + obj1.width < obj2.x
            && obj1.x > obj2.x + obj2.width
            && obj1.y + obj1.height < obj2.y
            && obj1.y > obj2.y + obj2.height);
    }

    //Detectar colisiones 2 (calculos más complejos
    //Aplicando elipses y distancia entre los centros
    //Mediante el teorema de pitagoras
    this.hit = function (obj1, obj2) {
        if (!this.collision(obj1, obj2)) return false;
        var cw1 = obj1.width >> 1;
        var ch1 = obj1.height >> 1;
        var cx1 = obj1.x + cw1;
        var cy1 = obj1.y + ch1;

        var cw2 = obj2.width >> 1;
        var ch2 = obj2.height >> 1;
        var cx2 = obj2.x + cw2;
        var cy2 = obj2.y + ch2;

        var rw = cw1 + cw2;
        var rh = ch1 + ch2;

        var hyp = Math.sqrt(Math.pow(cx2 - cx1, 2) + Math.pow(cy2 - cy1, 2));

        return (hyp < Math.min(rw, rh));
    }





    //============================================================================================
    //DEVOLVER OBJETO PÚBLICO
    //Devolver propiedades y métodos que serán públicos
    return {
        //Propiedades
        width: canvas.width,
        height: canvas.height,

        //Formas
        rectangle: this.rectangle,
        fillRect: this.fillRect,
        circle: this.circle,
        fillCircle: this.fillCircle,
        text: this.text,
        fillText: this.fillText,
        polygon: this.polygon,
        fillPoly: this.fillPoly,

        //Imágenes
        load: this.load,
        image: this.image,
        tile: this.tile,
        sprite: this.sprite,

        //Interfaz
        btn: this.btn,

        //Transformaciones
        scale: this.scale,
        rotate: this.rotate,
        opacity: this.opacity,
        resetTransform: this.resetTransform,

        //Ayudas
        clearScreen: this.clearScreen,
        radians: this.radians,
        outOfCanvas: this.outOfCanvas,
        edgesOfCanvas: this.edgesOfCanvas,
        collision: this.collision,
        hit: this.hit,

    }
}