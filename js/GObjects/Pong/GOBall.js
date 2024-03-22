import { graphics } from "../../main.js";
import GObject from "../GObject.js";
import { keyboard } from "../../main.js";
import { time } from "../../main.js";
import { game } from "../../main.js";
import { collisionRect } from "../../main.js";

export default class GOBall extends GObject {
    constructor() {
        super({ x: 500, y: 400, width: 10, height: 10 });
        this.xMinSpeed = 0.2;
        this.yMinSpeed = 0;

        this.xMaxSpeed = 0.5;
        this.yMaxSpeed = 0.4;

        this.xSpeed = this.xMinSpeed;
        this.ySpeed = 0;
        
        this.xDirection =-1;
        this.yDirection = -1;

        this.topBound = game.currentScene.topBound;
        this.bottomBound = game.currentScene.bottomBound - this.height;
        this.leftBound = game.currentScene.leftBound;
        this.rightBound = game.currentScene.rightBound;

        this.playerPaddle = game.currentScene.gobjects[0];
        this.cpuPaddle = game.currentScene.gobjects[1];
    }

    //----------------------------------------------------------------------------------------------
    update() {
        this.move();
        this.checkPlayerPaddleCollision();
        this.checkCpuPaddleCollision()
        this.checkTopBoundCollision();
        this.checkBottomBoundCollision();
        this.checkOnOutLeftBound();
        this.checkOnOutRightBound();
    }

    //----------------------------------------------------------------------------------------------
    draw() {
        graphics.fillCircle({ x: this.x, y: this.y, radius: this.width / 2 });
    }

    //----------------------------------------------------------------------------------------------
    onLoad() {
        this.x = 500;
        this.y = 300;
        this.xSpeed = this.xMinSpeed;
        this.xDirection = -1;
        Math.random() > 0.5 ? this.yDirection = 1 : this.yDirection = -1;
        this.ySpeed = Math.random() * (this.yMaxSpeed - this.yMinSpeed) + this.yMinSpeed;
    }

    //----------------------------------------------------------------------------------------------
    move() {
        this.x += this.xSpeed * time.deltaTime * this.xDirection;
        this.y += this.ySpeed * time.deltaTime * this.yDirection;
    }

    //----------------------------------------------------------------------------------------------
    checkTopBoundCollision() {
        if (this.y < this.topBound) {
            this.y = this.topBound;
            this.yInvertirection();
        }
    }

    //----------------------------------------------------------------------------------------------
    checkBottomBoundCollision() {
        if (this.y > this.bottomBound) {
            this.y = this.bottomBound;
            this.yInvertirection();
        }
    }

    //----------------------------------------------------------------------------------------------
    checkOnOutLeftBound() {
        if (this.x < this.leftBound - this.width) {
            game.currentScene.CPUScore++;
            this.onLoad();
        }
    }

    //----------------------------------------------------------------------------------------------
    checkOnOutRightBound() {
        if (this.x > this.rightBound) {
            game.currentScene.playerScore++;
            this.onLoad();
        }
    }

    //----------------------------------------------------------------------------------------------
    checkPlayerPaddleCollision() {

        if(collisionRect.isCollision(this, this.playerPaddle)){
            this.xInvertDirection();
            this.x = this.playerPaddle.x + this.playerPaddle.width + 1;

            if(collisionRect.isCollisionOnTopSide(this, this.playerPaddle)) {
                this.y = this.playerPaddle.y - 1;
                this.yDirection = -1;
                this.yAcelerate(0.04);
                this.xAcelerate(0.04);
                return;
            }

            if(collisionRect.isCollisionOnBottomSide(this, this.playerPaddle)) {
                this.yDirection = 1;
                this.yAcelerate(0.04);
                this.xAcelerate(0.04);
                return;
            }

            if(this.playerPaddle.currentSpeed < 0) {
                this.yDirection = -1;
                this.yAcelerate(0.03);
                this.xAcelerate(0.06);
                return;
            }

            if(this.playerPaddle.currentSpeed > 0) {
                this.yDirection = 1;
                this.yAcelerate(0.03);
                this.xAcelerate(0.06);
                return;
            }
            
            this.yDecelerate(0.02);
            this.xDecelerate(0.02);
        }
    }

    //----------------------------------------------------------------------------------------------
    checkCpuPaddleCollision() {
        if (collisionRect.isCollision(this, this.cpuPaddle)) {
            this.xInvertDirection();
            this.x = this.cpuPaddle.x - this.width - 1;
            this.yAcelerate(0.03);
            this.xAcelerate(0.06);
        }
    }

    //-----------------------------------------------------------------------------------------------
    xInvertDirection() {
        this.xDirection *= -1;
    }

    //-----------------------------------------------------------------------------------------------
    yInvertirection() {
        this.yDirection *= -1;
    }

    //-----------------------------------------------------------------------------------------------
    xAcelerate(speed) {
        if(this.xSpeed + speed > this.xMaxSpeed) {
            this.xSpeed = this.xMaxSpeed;
            return;
        }
        this.xSpeed += speed;
    }

    //-----------------------------------------------------------------------------------------------
    xDecelerate(speed) {
        if(this.xSpeed - speed < this.xMinSpeed) {
            this.xSpeed = this.xMinSpeed;
            return;
        }
        this.xSpeed -= speed;
    }

    //-----------------------------------------------------------------------------------------------
    yAcelerate(speed) {
        if(this.ySpeed + speed > this.yMaxSpeed) {
            this.ySpeed = this.yMaxSpeed;
            return;
        }
        this.ySpeed += speed;
    }

    //-----------------------------------------------------------------------------------------------
    yDecelerate(speed) {
        if(this.ySpeed - speed < this.yMinSpeed) {
            this.ySpeed = this.yMinSpeed;
            return;
        }
        this.ySpeed -= speed;
    }


}
