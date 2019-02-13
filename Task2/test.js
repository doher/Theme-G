'use strict';

const FIELD_WIDTH = 800,
    FIELD_HEIGTH = FIELD_WIDTH / 2,
    RACKET_SPEED = FIELD_HEIGTH / 20;

class Figure {
    constructor(height, width, className) {
        let _height = height,
            _width = width,
            _className = className;

        this.getHeight = function () {
            return _height || 50;
        }

        this.getWidth = function () {
            return _width || 50;
        }

        this.getClassName = function () {
            return _className || 'class-name';
        }
    }

    draw() {
        let elem = document.createElement('div');

        elem.style.height = this.getHeight() + 'px';
        elem.style.width = this.getWidth() + 'px';
        elem.className = this.getClassName();

        return elem;
    }

    getElement() {
        return document.querySelector('.' + this.getClassName());
    }
}

class Ball extends Figure {
    constructor(height, width, className, speedX, speedY) {
        super(height, width, className);

        let _speedX = speedX,
            _speedY = speedY;

        this.getSpeed = function () {

            return {
                x: _speedX || 1,
                y: _speedY || 1
            };
        }

        this.setSpeedX = function (speedX) {
            _speedX = speedX;
        }

        this.setSpeedY = function (speedY) {
            _speedY = speedY;
        }
    }

    update() {
        let div = this.getElement().parentElement,
            divHeight = div.offsetHeight,
            divWidth = div.offsetWidth;

        this.getElement().style.top = (divHeight - this.getHeight()) / 2 + 'px';
        this.getElement().style.left = (divWidth - this.getWidth()) / 2 + 'px';
    }

    move() {
        let div = this.getElement().parentElement,
            divHeight = div.offsetHeight - this.getElement().offsetHeight,
            divWidth = div.offsetWidth - this.getElement().offsetWidth,
            posX = parseInt(this.getElement().style.left),
            posY = parseInt(this.getElement().style.top);

        if (posX <= 0 || posX >= divWidth) {
            this.getElement().style.left = 0 + 'px';
            this.setSpeedX(-1 * this.getSpeed().x);
        }

        if (posY <= 0 || posY >= divHeight) {
            this.getElement().style.top = 0 + 'px';
            this.setSpeedY(-1 * this.getSpeed().y);
        }

        this.getElement().style.left = (posX + this.getSpeed().x) + 'px';
        this.getElement().style.top = (posY + this.getSpeed().y) + 'px';
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
        let div = this.getElement().parentElement,
            divHeight = div.offsetHeight,
            divWidth = div.offsetWidth;

        if (this.getSide()) {
            this.getElement().style.top = (divHeight - this.getHeight()) / 2 + 'px';
        } else {
            this.getElement().style.top = (divHeight - this.getHeight()) / 2 + 'px';
            this.getElement().style.left = (divWidth - this.getWidth()) + 'px';
        }
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
ball.setSpeedX(randomFunc(-10, 10) || 1);
ball.setSpeedY(randomFunc(-10, 10) || 1);
leftRacket.update();
rightRacket.update();

window.addEventListener('keydown', function (eo) {
    let keyCode = eo.keyCode,
        leftRacket = document.querySelector('.left-racket'),
        rightRacket = document.querySelector('.right-racket');

    if (keyCode === 38) {
        Up(rightRacket, RACKET_SPEED);
    }

    if (keyCode === 40) {
        Down(rightRacket, RACKET_SPEED, FIELD_HEIGTH, racketHeight);
    }

    if (keyCode === 87) {
        Up(leftRacket, RACKET_SPEED);
    }

    if (keyCode === 83) {
        Down(leftRacket, RACKET_SPEED, FIELD_HEIGTH, racketHeight);
    }
}, false);

function randomFunc(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function Up(element, delta) {
    let initialState = parseInt(element.style.top);

    if ((initialState - delta) <= 0) {
        element.style.top = 0 + 'px';
    } else {
        element.style.top = initialState - delta + 'px';
    }
}

function Down(element, delta, parentElementHeigth, elementHeigth) {
    let initialState = parseInt(element.style.top);

    if ((initialState + delta) >= (parentElementHeigth - elementHeigth)) {
        element.style.top = parentElementHeigth - elementHeigth + 'px';
    } else {
        element.style.top = initialState + delta + 'px';
    }
}

function Tick() {
    ball.move();
    PlanNextTick();
}

function PlanNextTick() {
    RequestAnimationFrame(Tick);
}

let RequestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 1000 / 60); };

PlanNextTick();