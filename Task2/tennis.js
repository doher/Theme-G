const FIELD_WIDTH = 800,
    FIELD_HEIGTH = FIELD_WIDTH / 2;

let tennisField = document.getElementsByClassName('tennis-field')[0],
    leftRacket = document.getElementsByClassName('left-racket')[0],
    rightRacket = document.getElementsByClassName('right-racket')[0],
    ball = document.getElementsByClassName('ball')[0];

tennisField.style.height = FIELD_HEIGTH + 'px';
tennisField.style.width = FIELD_WIDTH + 'px';

leftRacket.style.height = 0.3 * FIELD_HEIGTH + 'px';
leftRacket.style.width = 0.02 * FIELD_WIDTH + 'px';

rightRacket.style.height = 0.3 * FIELD_HEIGTH + 'px';
rightRacket.style.width = 0.02 * FIELD_WIDTH + 'px';

ball.style.height = 0.09 * FIELD_HEIGTH + 'px';
ball.style.width = 0.09 * FIELD_HEIGTH + 'px';
