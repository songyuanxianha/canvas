var drawing = document.getElementById("canvas");
var ctx = drawing.getContext("2d");
var lineWidth = 12;
var color = 'black';
drawing.addEventListener("touchmove",function(event) {
    event.preventDefault();
    var x = event.changedTouches[0].clientX;
    var y = event.changedTouches[0].clientY;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x, y)
    ctx.arc(x, y, 1, 0, 2*Math.PI, false);
    // ctx.lineTo(x+1, y+1);
    ctx.stroke();
    console.log('x:' + x);
    console.log('y:' + y);
 })