import { graphics } from "../main.js";
import Scene from "./AbstractScene.js";
import GOPlayerPaddle from "../GObjects/Pong/GOPlayerPaddle.js";
import GOcpuPaddle from "../GObjects/Pong/GOcpuPaddle.js";
import GOBall from "../GObjects/Pong/GOBall.js";
import { game } from "../main.js";

export default class PongScene extends Scene {
    topBound = 150;
    leftBound = 0;
    bottomBound = 600;
    rightBound = 600;

    midLine = {x1:graphics.width/2, y1:this.topBound, x2:graphics.width/2, y2:this.bottomBound, color:'#777', lineDash:[10,10], lineWidth:1};
    topLine = {x1:this.leftBound, y1:this.topBound, x2: graphics.width, y2: this.topBound}
    
    
    playerScore = 0;
    CPUScore = 0;


    //----------------------------------------------------------------------------------------------------
    onLoad() {
        this.addGObject(new GOPlayerPaddle());
        this.addGObject(new GOcpuPaddle());
        this.addGObject(new GOBall());
        //Maquetar posición de los principales elementos

        graphics.fillRect({x:562, y:200, width:8, height:50});
        graphics.fillCircle({x:100, y:300, radius:5});
        this.gobjects[2].onLoad();
        game.play();
    }

    //----------------------------------------------------------------------------------------------------
    draw() {
        graphics.clearScreen();
        graphics.line(this.midLine);
        for(let i = 0; i < this.gobjects.length; i++) this.gobjects[i].draw();
        graphics.line(this.topLine);
        graphics.fillText({x:100, y:90, text: this.playerScore, align:'center', size: '60px', font:"Kode Mono"});
        graphics.fillText({x:500, y:90, text: this.CPUScore, align:'center', size: '60px', font:"Kode Mono"});
    }






    /*
        - fondo -> fondo negro
        
        Player paddle 
            - Rectangulo vertical blanco
            - Acción de movimiento vertical
            - Suave aceleración y deceleración (opc)

        CPU paddle
            - Rectangulo vertical blanco
            - Acción de movimiento vertical
            - Suave aceleración y deceleración (opc)

        Ball
        - Círculo blanco
        - Acción de movimiento
        - Acción de rebotar según donde se golpé en la raqueta
        - Acción de rebotar al chocar con los bordes superiores e inferiores
        - Acción de anotar punto para el jugador al salir por el borde izquierdo
        - Acción de anotar punto para la CPU al salir por el borde derecho
        - Acción de acelerar la bola en función de la velocidad de la raqueta
        

        midLine
        - Línea discontinua en el centro del campo

        Player points
        - Marcador con los puntos obtenidos por el jugador

        CPU points
        - Marcador con los puntos obtenidos por la CPU

        limits
        - Limites superior e inferior
        - Limites izquierdo y derecho

        Trayectoría (opc)
        - Acción de mostrar la trayectoria que va a seguir la bola tras ser golpeada por una raqueta
    */


}