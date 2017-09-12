var r = 8;
var window_width = 1027;
var window_height = 768;
var margin_top = 60;
var margin_left = 40;
var endTime = new Date(2017, 7, 16,16, 10, 0);
var showTimeSe = 0; // 用来存倒计时毫秒数
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
window.onload = function() {
    window_width = document.documentElement.clientWidth;
    window_height = document.documentElement.clientHeight;

    margin_left = Math.round(window_width /10);
    r = Math.round(window_width * 4 / 5 / 108)-1

    margin_top = Math.round(window_height /5);
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = window_width;
    canvas.height = window_height;
    showTimeSe = getshowSeconds();
    // draw(context);
    setInterval(function() {
        draw(context);
        update();
    }, 50)
    // if(showTimeSe == 0) {
    //     draw(context);
    //     addBalls(margin_left, margin_top, parseInt(showHours/10));
    //     addBalls(margin_left + 15*(r + 1), margin_top, parseInt(showHours%10));
    //     addBalls(margin_left + 39*(r + 1), margin_top , parseInt(showMinutes/10));
    //     addBalls(margin_left + 54*(r + 1), margin_top, parseInt(showMinutes%10));
    //     addBalls(margin_left + 78*(r + 1), margin_top, parseInt(showSeconds/10));
    //     addBalls(margin_left + 93*(r + 1), margin_top, parseInt(showSeconds%10));
    //     setInterval(function() {
    //         updateBalls();
    //     }, 50)
    // }
}
// 取得倒计时所需的毫秒数
function getshowSeconds() {
    var now = new Date();
    var ret = endTime.getTime() - now.getTime();
    ret = Math.round(ret / 1000);   //取整
    return ret >= 0 ? ret : 0;
}
function update() {
    // 获取下一个时间
    var nextTimeSe = getshowSeconds();
    var nextHours = parseInt( nextTimeSe / 3600);
    var nextMinutes = parseInt( (nextTimeSe - nextHours * 3600)/60 );
    var nextSeconds = nextTimeSe % 60
    // 之前的时间
    var showHours = parseInt( showTimeSe / 3600);
    var showMinutes = parseInt( (showTimeSe - showHours * 3600)/60 )
    var showSeconds = showTimeSe % 60;
    // 当两次获取到的时间发生变化
    if(nextSeconds != showHours) {
        // 在每个变化的数字上生成彩色小球
        if(parseInt(nextHours/10) != parseInt(showHours/10)) {
            addBalls(margin_left, margin_top, parseInt(showHours/10))
        }
        if(parseInt(nextHours%10) != parseInt(showHours%10)) {
            addBalls(margin_left + 15*(r + 1), margin_top, parseInt(showHours%10))
        }
        if(parseInt(nextMinutes/10) != parseInt(showMinutes/10)) {
            addBalls(margin_left + 39*(r + 1), margin_top , parseInt(showMinutes/10))
        }
        if(parseInt(nextMinutes%10) != parseInt(showMinutes%10)) {
            addBalls(margin_left + 54*(r + 1), margin_top, parseInt(showMinutes%10))
        }
        if(parseInt(showSeconds/10) != parseInt(nextSeconds/10)) {
            addBalls(margin_left + 78*(r + 1), margin_top, parseInt(showSeconds/10))
        }
        if(parseInt(showSeconds%10) != parseInt(nextSeconds%10)) {
            addBalls(margin_left + 93*(r + 1), margin_top, parseInt(showSeconds%10))
        }
        showTimeSe = nextTimeSe;
    }
    updateBalls();
    console.log(balls.length);
    
}
function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= window_height-r ){
            balls[i].y = window_height-r;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }
    // 清除滚出画布的小球
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if(balls[i].x + r > 0 && balls[i].x - r < window_width) {
            balls[cnt++] = balls[i]
        }  
    }
    while (balls.length > cnt) {
        balls.pop();
    }
}
// 生成小球的函数
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if(digit[num][i][j] == 1) {
                var aball = {
                    x: x + j * 2 * (r + 1) + (r + 1), // 生成彩色小球x轴的位置
                    y: y + i * 2 * (r + 1) + (r + 1), // 生成彩色小球y轴的位置
                    g: 1.5+Math.random(),  // 小球掉落的加速度
                    vx: Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4, // x轴方向每秒的位移
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }
                balls.push(aball)
            }
        }
        
    }
}
// 画数字
function draw(cxt) {
    cxt.clearRect(0, 0, window_width, window_height);
    var hours = parseInt( getshowSeconds() / 3600);
    var minutes = parseInt( (getshowSeconds() - hours * 3600)/60 )
    var seconds = getshowSeconds() % 60
    renderDigit( margin_left ,margin_top , parseInt(hours/10) , cxt );
    renderDigit( margin_left + 15*(r + 1) , margin_top , parseInt(hours%10) , cxt )
    renderDigit( margin_left + 30*(r + 1) , margin_top , 10 , cxt )
    renderDigit( margin_left + 39*(r + 1) , margin_top , parseInt(minutes/10) , cxt);
    renderDigit( margin_left + 54*(r + 1) , margin_top , parseInt(minutes%10) , cxt);
    renderDigit( margin_left + 69*(r + 1) , margin_top , 10 , cxt);
    renderDigit( margin_left + 78*(r + 1) , margin_top , parseInt(seconds/10) , cxt);
    renderDigit( margin_left + 93*(r + 1) , margin_top , parseInt(seconds%10) , cxt);
    // 画出彩色小球
    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , r , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }
}
// 循环代表每个数字的二维数组画出数字
function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            var arcx = x + j * 2 * (r + 1) +(r + 1);
            var arcy = y + i * 2 * (r + 1) + (r + 1);
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( arcx , arcy , r , 0 , 2*Math.PI )
                cxt.closePath()
                cxt.fill()
            }
        }
        
    }
}
