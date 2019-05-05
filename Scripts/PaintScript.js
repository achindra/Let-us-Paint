//
// PaintScript.js
// 

//var canvas = document.getElementById("myCanvas");
//if (canvas.getContext) { ctx = canvas.getContext('2d'); }
//else { alert('update or change your browser to use the drawing board'); }
var ctx;// = canvas.getContext("2d");
var dataURL;// = canvas.toDataURL("image/jpg");
//document.getElementById('canvasImg').src = dataURL;
//var img = new Image();
//img.src = "http://www.google.com/a/cpanel/gigabits.co.in/images/logo.gif";

var IsDrawing = false;
var DrawType = "Circle";
var PenColor = "#FF0000";
var PenSize = "1";
var CanvasColor = "#FFFFFF";
var ColorPickerMode = "Show";

var MouseX = 0;
var MouseY = 0;



//canvas.addEventListener('mousedown', Paint_MouseDown, false);
//canvas.addEventListener('mouseup', Paint_MouseUp, false);
//canvas.addEventListener('mousemove', Paint_MouseMove, false);



//ShowColorPicker.addEventListener( onchange, ShowHideColorPicker, false);
//DownloadImg.addEventListener(onclick, Download_Image, false);

//imageObj.onload = function () {
//    ctx.drawImage(imageObj, 69, 50);
//};
//imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

//function Paint_Initialize(e) {
    //ctx.drawImage(img, 0, 0, 150, 70);

//}

function getContext(canvasId) {
    canvas = document.getElementById(canvasId);
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        dataURL = canvas.toDataURL("image/jpg");
        ctx.fillStyle = PenColor;
    }
    else {
        alert('update or change your browser to use the drawing board');
    }
}

function Radio_Tool(val) {
    DrawType = val;
}

function Radio_Brush(val) {
    PenSize = val;
}

function DrawPoint(e) {
    ctx.beginPath();
    ctx.arc(e.layerX, e.layerY, 1, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function Draw(e) {
    if (IsDrawing) {
        if (DrawType == "Circle") {
            ctx.beginPath();
            ctx.fillStyle = PenColor;
            var Radius = Math.sqrt((MouseX - e.layerX) * (MouseX - e.layerX) + (MouseY - e.layerY) * (MouseY - e.layerY));
            ctx.arc(MouseX, MouseY, Radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
        else if (DrawType == "Rectangle") {
            ctx.beginPath();
            ctx.fillStyle = PenColor;
            ctx.rect(MouseX, MouseY, e.layerX - MouseX, e.layerY - MouseY);
            ctx.closePath();
            ctx.fill();
        }
        else if (DrawType == "Pen") {
            ctx.lineWidth = PenSize;
            ctx.strokeStyle = PenColor;
            ctx.beginPath();
            ctx.moveTo(MouseX, MouseY);
            ctx.lineTo(e.layerX, e.layerY);
            MouseX = e.layerX;
            MouseY = e.layerY;
            ctx.closePath();
            ctx.stroke();
        }
        else if (DrawType == "Line") {
            ctx.lineWidth = PenSize;
            ctx.strokeStyle = PenColor;
            ctx.beginPath();
            ctx.moveTo(MouseX, MouseY);
            ctx.lineTo(e.layerX, e.layerY);
            ctx.stroke();
        }
        else if (DrawType == "Eraser") {
            ctx.lineWidth = PenSize;
            ctx.strokeStyle = CanvasColor;
            ctx.beginPath();
            ctx.moveTo(MouseX, MouseY);
            ctx.lineTo(e.layerX, e.layerY);
            MouseX = e.layerX;
            MouseY = e.layerY;
            ctx.closePath();
            ctx.stroke();
        }
    }
}

$(document).ready(function () {
    getContext('myCanvas');

    $(function () {
        $('#IsLine').addEventListener(onclick, Radio_Tool("Line"), false);
        $('#IsRectangle').addEventListener(onclick, Radio_Tool("Rectangle"), false);
        $('#IsCircle').addEventListener(onclick, Radio_Tool("Circle"), false);
        $('#IsEraser').addEventListener(onclick, Radio_Tool("Eraser"), false);
        $('#IsPen').addEventListener(onclick, Radio_Tool("Pen"), false);

        $('#Brush_Size_2').addEventListener(onchange, Radio_Brush(2), false);
        $('#Brush_Size_3').addEventListener(onchange, Radio_Brush(3), false);
        $('#Brush_Size_4').addEventListener(onchange, Radio_Brush(4), false);
        $('#Brush_Size_5').addEventListener(onclick, Radio_Brush(5), false);
        $('#Brush_Size_1').addEventListener(onclick, Radio_Brush(1), false);
    });
});


$('#myCanvas').onload(function (e) {

});

$('#myCanvas').mouseDown(function (e) {
    //function Paint_MouseDown(e) {
    IsDrawing = true;
    MouseX = e.layerX;
    MouseY = e.layerY;
    if (DrawType == "Line") DrawPoint(e);
});

$('#myCanvas').mouseup(function (e) {
    //function Paint_MouseUp(e) {
    if (DrawType == "Line") Draw(e);
    IsDrawing = false;
});

$('#myCanvas').mouseMove(function (e) {
    //function Paint_MouseMove(e) {
    if (!IsDrawing) return;
    if (DrawType == "Line") return;

    Draw(e);
    return false;;
});



//******************************************************

function getMousePos(canvas, evt) {
    // get canvas position
    var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }

    // return relative mouse position
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return {
        x: mouseX,
        y: mouseY
    };
}

function drawColorSquare(canvas, color, imageObj) {
    var colorSquareSize = 100;
    var padding = 10;
    var context = canvas.getContext("2d");
    context.beginPath();
    context.fillStyle = color;
    var squareX = (canvas.width - colorSquareSize + imageObj.width) / 2;
    var squareY = (canvas.height - colorSquareSize) / 2;
    context.fillRect(squareX, squareY, colorSquareSize, colorSquareSize);
    context.strokeRect(squareX, squareY, colorSquareSize, colorSquareSize);
}

function init(imageObj) {
    var padding = 10;
    var ColorPickerCanvas = document.getElementById("ColorPicker");
    var context = ColorPickerCanvas.getContext("2d");
    var mouseDown = false;

    context.strokeStyle = "#444";
    context.lineWidth = 2;

    ColorPickerCanvas.addEventListener("mousedown", function () {
        mouseDown = true;
    }, false);

    ColorPickerCanvas.addEventListener("mouseup", function () {
        mouseDown = false;
    }, false);

    ColorPickerCanvas.addEventListener("mousemove", function (evt) {
        var mousePos = getMousePos(ColorPickerCanvas, evt);
        var color = undefined;

        if (mouseDown &&
        mousePos !== null &&
        mousePos.x > padding &&
        mousePos.x < padding + imageObj.width &&
        mousePos.y > padding &&
        mousePos.y < padding + imageObj.height) {
            /*
             * color picker image is 256x256 and is offset by 10px
             * from top and bottom
             */
            var imageData = context.getImageData(padding, padding, imageObj.width, imageObj.width);
            var data = imageData.data;
            var x = mousePos.x - padding;
            var y = mousePos.y - padding;
            var red = data[((imageObj.width * y) + x) * 4];
            var green = data[((imageObj.width * y) + x) * 4 + 1];
            var blue = data[((imageObj.width * y) + x) * 4 + 2];
            color = "rgb(" + red + "," + green + "," + blue + ")";
            PenColor = color;
        }

        if (color) {
            drawColorSquare(ColorPickerCanvas, color, imageObj);
        }
    }, false);

    context.drawImage(imageObj, padding, padding);
    drawColorSquare(ColorPickerCanvas, "white", imageObj);
}

window.onload = function () {
    var imageObj = new Image();
    imageObj.onload = function () {
        init(this);
    };
    imageObj.src = "color_picker.png";
};