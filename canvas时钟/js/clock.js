var drawing = document.getElementById('clock');
if(drawing.getContext) {
    var cxt = drawing.getContext('2d');
    var width = cxt.canvas.width;
    var height = cxt.canvas.height;
    var r = width/2;
    var rem = width / 200;
    function drawArc() {
        // 画外圆
        cxt.save();
        cxt.translate(r,r);
        cxt.beginPath();
        cxt.lineWidth = 10 * rem;
        cxt.arc(0, 0, r-(cxt.lineWidth/2), 0, 2 * Math.PI, false);
        cxt.stroke();
        // 小时数
        var hoursArr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        for (var i = 0; i < hoursArr.length; i++) {
            var rad = 2 * Math.PI / 12 * i;
            var x = Math.cos(rad) * (r-30 * rem);
            var y = Math.sin(rad) * (r-30 * rem);
            cxt.font = 18 * rem + "px Arial";
            cxt.textAlign = "center";
            cxt.textBaseline = "middle";
            cxt.fillText(hoursArr[i], x, y);
        }

        // 画刻度
        for (var i = 0; i < 60; i++) {
            var rad = 2 * Math.PI / 60 * i;
            var x = Math.cos(rad) * (r-18 * rem);
            var y = Math.sin(rad) * (r-18 * rem);
            cxt.beginPath();
            if (i % 5 === 0) {
                cxt.fillStyle = '#000';
                cxt.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
            } else {
                cxt.fillStyle = '#ccc';
                cxt.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
            }
            cxt.fill();
        }
    }
    // 时针
    function drawHours(hour, min) {
        cxt.save();
        var rad = 2 * Math.PI / 12 * hour;
        var minRad = 2 * Math.PI / 12 / 60 * min;
        cxt.beginPath();
        cxt.rotate(rad + minRad);
        cxt.moveTo(0, 10 * rem)
        cxt.lineTo(0, -(r/2));
        cxt.lineCap = "round";
        cxt.lineWidth = 6 * rem;
        cxt.stroke();
        cxt.restore();
    }
    // 分针
    function drawMin(min) {
        cxt.save();
        var rad = 2 * Math.PI / 60 * min;
        cxt.beginPath();
        cxt.rotate(rad);
        cxt.moveTo(0, 10 * rem)
        cxt.lineTo(0, -(r-30 * rem));
        cxt.lineCap = "round";
        cxt.lineWidth = 4 * rem;
        cxt.stroke();
        cxt.restore();
    }
    // 秒针
    function drawSecond(sec) {
        cxt.save();
        var rad = 2 * Math.PI / 60 * sec;
        cxt.beginPath();
        cxt.rotate(rad);
        cxt.moveTo(0, 10 * rem)
        cxt.lineTo(0, -(r-20 * rem));
        cxt.lineCap = "round";
        cxt.lineWidth = 2;
        cxt.strokeStyle = 'red';
        cxt.stroke();
        cxt.restore();
    }
    // 中间的圆心
    function centerArc() {
        cxt.save();
        cxt.beginPath();
        cxt.arc(0, 0, 4 * rem, 0, 2 * Math.PI, false);
        cxt.fill();
        cxt.restore();
    }
    // 传入当前时间
    function clock() {
        cxt.clearRect(0, 0, width, height);
        var date = new Date();
        var hours = date.getHours() - 12;
        var min = date.getMinutes();
        var sec = date.getSeconds();
        drawArc();
        drawHours(hours, min);
        drawMin(min);
        drawSecond(sec);
        centerArc();
        cxt.restore();
    }
    clock();
    setInterval(clock, 1000);
}