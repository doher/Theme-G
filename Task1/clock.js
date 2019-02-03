'use strict';

const x0 = 200,
    y0 = 200,
    RADIUS = 150;

function updateTime() {
    let currTime = new Date(),
        seconds = currTime.getSeconds(),
        minutes = currTime.getMinutes(),
        hours = currTime.getHours(),
        angelSecArr = seconds * Math.PI / 30,
        angelMinuteArr = minutes * Math.PI / 30,
        angelHourArr = hours * Math.PI / 6,
        currTimeStr = formatTime(currTime),
        digitalClock = document.getElementById("digitalClock"),
        hourArrowElem = document.getElementById("hourArrow"),
        minuteArrowElem = document.getElementById("minuteArrow"),
        secondArrowElem = document.getElementById("secondArrow"),
        txtElem = createElem('text'),
        hourArrow = createElem('line'),
        minuteArrow = createElem('line'),
        secondArrow = createElem('line');

    txtElem.setAttributeNS(null, "id", "digitalClock");
    txtElem.setAttributeNS(null, "x", x0 - 50);
    txtElem.setAttributeNS(null, "y", y0 - 70);
    txtElem.setAttributeNS(null, "font-size", 26);

    secondArrow.setAttributeNS(null, "id", "secondArrow");
    secondArrow.setAttributeNS(null, "stroke", "red");
    secondArrow.setAttributeNS(null, "x1", x0);
    secondArrow.setAttributeNS(null, "y1", y0);
    secondArrow.setAttributeNS(null, "x2", x0 + (RADIUS - 25) * Math.cos(angelSecArr - Math.PI / 2));
    secondArrow.setAttributeNS(null, "y2", y0 + (RADIUS - 25) * Math.sin(angelSecArr - Math.PI / 2));

    minuteArrow.setAttributeNS(null, "id", "minuteArrow");
    minuteArrow.setAttributeNS(null, "stroke", "blue");
    minuteArrow.setAttributeNS(null, "stroke-width", 4);
    minuteArrow.setAttributeNS(null, "stroke-linecap", "square");
    minuteArrow.setAttributeNS(null, "x1", x0);
    minuteArrow.setAttributeNS(null, "y1", y0);
    minuteArrow.setAttributeNS(null, "x2", x0 + (RADIUS - 40) * Math.cos(angelMinuteArr - Math.PI / 2));
    minuteArrow.setAttributeNS(null, "y2", y0 + (RADIUS - 40) * Math.sin(angelMinuteArr - Math.PI / 2));

    hourArrow.setAttributeNS(null, "id", "hourArrow");
    hourArrow.setAttributeNS(null, "stroke", "black");
    hourArrow.setAttributeNS(null, "stroke-width", 10);
    hourArrow.setAttributeNS(null, "stroke-linecap", "round");
    hourArrow.setAttributeNS(null, "x1", x0);
    hourArrow.setAttributeNS(null, "y1", y0);
    hourArrow.setAttributeNS(null, "x2", x0 + (RADIUS - 60) * Math.cos(angelHourArr - Math.PI / 2));
    hourArrow.setAttributeNS(null, "y2", y0 + (RADIUS - 60) * Math.sin(angelHourArr - Math.PI / 2));

    removeElem(digitalClock);
    removeElem(secondArrowElem);
    removeElem(minuteArrowElem);
    removeElem(hourArrowElem);

    let clockTxt = document.createTextNode(currTimeStr);

    txtElem.appendChild(clockTxt);
    svgElem.appendChild(txtElem);
    svgElem.appendChild(hourArrow);
    svgElem.appendChild(minuteArrow);
    svgElem.appendChild(secondArrow);
}

function createElem(svgElem) {
    let elem = document.createElementNS("http://www.w3.org/2000/svg", svgElem);

    return elem;
}

function formatTime(dt) {
    let hours = dt.getHours(),
        minutes = dt.getMinutes(),
        seconds = dt.getSeconds();

    return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
}

function str0l(val, len) {
    let strVal = val.toString();

    while (strVal.length < len) {
        strVal = '0' + strVal;
    }

    return strVal;
}

function removeElem(elem) {
    if (elem) {
        elem.remove();
    }
}

let svg = createElem("svg"),
    container = document.getElementById('container');

svg.setAttributeNS(null, "id", "clock");
svg.setAttributeNS(null, "height", "400");
svg.setAttributeNS(null, "width", "400");

container.appendChild(svg);

let svgElem = document.getElementById('clock'),
    circleElem = createElem("circle");

circleElem.setAttributeNS(null, "cx", x0);
circleElem.setAttributeNS(null, "cy", y0);
circleElem.setAttributeNS(null, "r", RADIUS);
circleElem.setAttributeNS(null, "fill", "yellow");

svgElem.appendChild(circleElem);

for (let i = 0; i < 12; ++i) {
    let numeral = createElem("circle"),
        num = createElem("text"),
        angel = i * Math.PI / 6,
        cX = x0 + (RADIUS - 25) * Math.sin(angel + Math.PI),
        cY = y0 + (RADIUS - 25) * Math.cos(angel + Math.PI);

    numeral.setAttributeNS(null, "cx", cX);
    numeral.setAttributeNS(null, "cy", cY);
    numeral.setAttributeNS(null, "r", 20);
    numeral.setAttributeNS(null, "fill", "green");

    num.setAttributeNS(null, "x", cX - 9);
    num.setAttributeNS(null, "y", cY + 5);
    num.setAttributeNS(null, "font-size", 24);
    num.setAttributeNS(null, "stroke", "white");

    let textNum = document.createTextNode(12 - i);

    num.appendChild(textNum);
    svgElem.appendChild(numeral);
    svgElem.appendChild(num);
}

setInterval(updateTime, 1000);

