'use strict';

const FIELD_WIDTH = 800,
    FIELD_HEIGTH = FIELD_WIDTH / 2,
    RACKET_SPEED = 10;

class Figure {
    constructor(height, width, className) {
        let _height = height,
            _width = width,
            _className = className;

        this.getHeight = function () {
            return _height || 0;
        }

        this.getWidth = function () {
            return _width || 0;
        }

        this.getClassName = function () {
            return _className || 'no-class';
        }
    }

    draw() {
        let element = document.createElement('div');

        element.style.height = this.getHeight() + 'px';
        element.style.width = this.getWidth() + 'px';
        element.className = this.getClassName();

        return element;
    }

    getElement() {
        return document.querySelector('.' + this.getClassName());
    }

    getCoords() {
        let element = this.getElement(),
            posX = parseInt(element.style.left),
            posY = parseInt(element.style.top);

        return {
            x: posX || 'coord x not found',
            y: posY || 'coord y not found'
        };
    }
}

class Ball extends Figure {
    constructor(height, width, className, speedX, speedY) {
        super(height, width, className);

        let _speedX = speedX,
            _speedY = speedY;

        this.getSpeedX = function () {
            return _speedX || 1;
        }

        this.getSpeedY = function () {
            return _speedY || 1;
        }

        this.setSpeedX = function (speedX) {
            _speedX = speedX;
        }

        this.setSpeedY = function (speedY) {
            _speedY = speedY;
        }
    }

    update() {
        let element = this.getElement(),
            div = element.parentElement,
            divHeight = div.offsetHeight,
            divWidth = div.offsetWidth;

        element.style.top = (divHeight - this.getHeight()) / 2 + 'px';
        element.style.left = (divWidth - this.getWidth()) / 2 + 'px';
    }

    move() {
        let element = this.getElement(),
            coords = this.getCoords();

        element.style.left = (coords.x + this.getSpeedX()) + 'px';
        element.style.top = (coords.y + this.getSpeedY()) + 'px';
    }

    stop() {
        let element = this.getElement(),
            coord = this.getCoords();

        element.style.left = coord.x + 'px';
        element.style.top = coord.y + 'px';
    }

    changeDirectionX() {
        this.setSpeedX(-this.getSpeedX());
    }

    changeDirectionY() {
        this.setSpeedY(-this.getSpeedY());
    }
}

class Racket extends Figure {
    constructor(height, width, className, isLeft) {
        super(height, width, className);

        let _isLeft = isLeft;

        this.getSide = function () {
            return _isLeft;
        }
    }

    update() {
        let element = this.getElement(),
            div = element.parentElement,
            divHeight = div.offsetHeight,
            divWidth = div.offsetWidth;

        if (this.getSide()) {
            element.style.top = (divHeight - this.getHeight()) / 2 + 'px';
        } else {
            element.style.top = (divHeight - this.getHeight()) / 2 + 'px';
            element.style.left = (divWidth - this.getWidth()) + 'px';
        }
    }

    moveUp() {
        let element = this.getElement(),
            coord = this.getCoords();

        element.style.top = (coord.y - RACKET_SPEED) + 'px';

        if ((coord.y - RACKET_SPEED) <= 0) {
            element.style.top = 1 + 'px';
        }
    }

    moveDown() {
        let element = this.getElement(),
            coord = this.getCoords();

        element.style.top = (coord.y + RACKET_SPEED) + 'px';

        if ((coord.y + element.offsetHeight + RACKET_SPEED) >= FIELD_HEIGTH) {
            element.style.top = FIELD_HEIGTH - element.offsetHeight + 'px';
        }
    }

    stop() {
        let element = this.getElement(),
            coord = this.getCoords();

        element.style.top = coord.y + 'px';
    }
}

let ballHeight = Math.round(0.09 * FIELD_HEIGTH),
    ballWidth = ballHeight,
    racketHeight = Math.round(0.3 * FIELD_HEIGTH),
    racketWidth = Math.round(0.02 * FIELD_WIDTH),
    gameField = new Figure(FIELD_HEIGTH, FIELD_WIDTH, 'game-field'),
    ball = new Ball(ballHeight, ballWidth, 'ball'),
    leftRacket = new Racket(racketHeight, racketWidth, 'left-racket', true),
    rightRacket = new Racket(racketHeight, racketWidth, 'right-racket', false),
    gameFieldClassNameSelector = '.' + gameField.getClassName();

document.body.appendChild(gameField.draw());
document.querySelector(gameFieldClassNameSelector).appendChild(leftRacket.draw());
document.querySelector(gameFieldClassNameSelector).appendChild(ball.draw());
document.querySelector(gameFieldClassNameSelector).appendChild(rightRacket.draw());

ball.update();
leftRacket.update();
rightRacket.update();

let leftUpTimer,
    leftDownTimer,
    rightUpTimer,
    rightDownTimer;

document.addEventListener('keydown', function (eo) {
    let keyCode = eo.keyCode;

    switch (keyCode) {
        case 16:
            leftUpTimer = setInterval(() => {
                leftRacket.moveUp();
            }, 16);
            break;
        case 17:
            leftDownTimer = setInterval(() => {
                leftRacket.moveDown();
            }, 16);

            break;
        case 38:
            rightUpTimer = setInterval(() => {
                rightRacket.moveUp();
            }, 16);
            break;
        case 40:
            rightDownTimer = setInterval(() => {
                rightRacket.moveDown();
            }, 16);
            break;
    }
}, false);

document.addEventListener('keyup', function (eo) {
    let keyCode = eo.keyCode;

    switch (keyCode) {
        case 16:
        case 17:
            clearInterval(leftUpTimer);
            clearInterval(leftDownTimer);
            leftRacket.stop();
            break;
        case 38:
        case 40:
            clearInterval(rightUpTimer);
            clearInterval(rightDownTimer);
            rightRacket.stop();
            break;
    }
}, false);


function randomFunc(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function Tick() {
    ball.move();
    PlanNextTick();
}

function rebound(ball, racket) {
    let ballCoords = ball.getCoords(),
        racketCoords = racket.getCoords(),
        wallWidth = (racket.getSide()) ? racketWidth : (FIELD_WIDTH - racketWidth);

    if (ballCoords.x <= wallWidth) {

        if ((ballCoords.y + ballHeight > racketCoords.y) &&
            (ballCoords.y < racketCoords.y + racketHeight)) {}
    }

}

function PlanNextTick() {
    let ballCoords = ball.getCoords(),
        leftRacketCoords = leftRacket.getCoords(),
        rightRacketCoords = rightRacket.getCoords(),
        leftSide = document.querySelector('.left-side'),
        rightSide = document.querySelector('.right-side');

    if ((ballCoords.y <= 0) || (ballCoords.y >= (FIELD_HEIGTH - ballHeight))) {
        ball.changeDirectionY();
    }

    if (ballCoords.x <= racketWidth) {

        if ((ballCoords.y + ballHeight > leftRacketCoords.y) &&
            (ballCoords.y < leftRacketCoords.y + racketHeight)) {
            ball.changeDirectionX();
        } else {
            isStart = false;
            ball.stop();
            leftSide.innerHTML = +leftSide.textContent + +1;
            return;
        }
    }

    if (ballCoords.x >= (FIELD_WIDTH - racketWidth - ballWidth)) {

        if ((ballCoords.y + ballHeight > rightRacketCoords.y) &&
            (ballCoords.y < rightRacketCoords.y + racketHeight)) {
            ball.changeDirectionX();
        } else {
            isStart = false;
            ball.stop();
            rightSide.innerHTML = +rightSide.textContent + +1;
            return;
        }
    }

    RequestAnimationFrame(Tick);
}

let RequestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

let button = document.querySelector('.start-button'),
    isStart = false;

button.addEventListener('click', function () {
    let speeds = [5, -5];

    ball.update();
    ball.setSpeedX(speeds[randomFunc(0, 1)]);
    ball.setSpeedY(speeds[randomFunc(0, 1)]);
    leftRacket.update();
    rightRacket.update();

    if (!isStart) {
        isStart = true;
        PlanNextTick();
    }

}, false);