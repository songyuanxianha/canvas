var DEFAULT_BRUSH_SIZE = 4;//设置默认的画笔大小
var DEFAULT_BRUSH_COLOR = 'black';//画笔颜色
var BACKGROUND_COLOR = "#fff";//设置画布的背景颜色
var isTouchStart;//记录鼠标是否已经按下
var pos = {};//记录画笔的位置
var next_pos = {};//记录下一点画笔位置
var canvas = document.getElementById('canvas');//根据ID获取画布
var context = canvas.getContext('2d');//获取画布上下文
var canvasWidth = canvas.width = window.innerWidth - 2;//获取画布宽度
var canvasHeight = canvas.height = (window.innerHeight - document.querySelector('.set').offsetHeight) - 100;//获取画布高度
$(function() {
    $('.hua').css('width', canvasWidth);
    $('.hua').css('height', canvasHeight);
})
//初始化执行函数
function init() {
    context.fillStyle = BACKGROUND_COLOR;//设置背景填充颜色
    context.fillRect(0, 0, canvasWidth, canvasHeight);//填充画布背景
    pos.x = null;
    pos.y = null;
    var TOUCHSTART, TOUCHMOVE, TOUCHEND;
    if (typeof (window.ontouchstart) != 'undefined') {
        TOUCHSTART = 'touchstart';
        TOUCHEND = 'touchend';
        TOUCHMOVE = 'touchmove';
    } else {
        TOUCHSTART = 'touchstart';
        TOUCHEND = 'touchend';
        TOUCHMOVE = 'touchmove';
    }
    $display = document.getElementById('display');
    $pos_display = document.getElementById("pos_display");
    document.addEventListener(TOUCHMOVE, touchMove, false);//监听触摸事件
    document.addEventListener(TOUCHSTART, touchStart, false);//监听触摸开始事件
    document.addEventListener(TOUCHEND, touchEnd, false);//监听触摸结束事件
    setInterval(loop, 1000 / 60);	//设置监听事件间隔
}


//鼠标移动事件
function touchMove(e) {
    if (typeof (window.ontouchstart) != 'undefined') {
        pos = setPos(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    } else {
        pos = setPos(e.clientX, e.clientY);
    }
    if (isTouchStart) draw(context);
}
function setPos(pointx, pointy) {
    var n_pos = {};
    n_pos.x = pointx;
    n_pos.y = pointy;
    return n_pos;
}
//鼠标点击事件
function touchStart(e) {
    if (typeof (window.ontouchstart) != 'undefined') {
        pos.x = next_pos.x =e.changedTouches[0].clientX;
        pos.y = next_pos.y = e.changedTouches[0].clientY;
        isTouchStart = true;
        draw(context,e);
    }else{
        isTouchStart = true;
        draw(context);
    }
}
//鼠标抬起事件
function touchEnd(e) {
    context.beginPath();
    if (typeof (window.ontouchstart) != 'undefined') {
        next_pos.x = e.changedTouches[0].clientX;
        next_pos.y = e.changedTouches[0].clientY;
        draw(context);
    }
    isTouchStart = false;
}

//事件间隔循环执行的函数
function loop(e) {
    update(pos);
    //绘制鼠标点击位置
}

function update(up_point) {
    if (!next_pos) {
        next_pos = setPos(0, 0);
    } else {
        next_pos = setPos(up_point.x, up_point.y);
    }
}

//绘制
function draw(ctx,e) {
    ctx.save();//保存当前绘图状态
    ctx.fillStyle = DEFAULT_BRUSH_COLOR;//设置填充的背景颜色
    ctx.lineWidth = DEFAULT_BRUSH_SIZE;  //设置画笔的大小
    ctx.lineCap = "round"; //设置线条，让线条边缘更圆滑
    ctx.beginPath();

    //当前点与上一个点的坐标重合时
    if (pos.x == next_pos.x && pos.y == next_pos.y) {
        ctx.arc(pos.x, pos.y, DEFAULT_BRUSH_SIZE / 1.7, 0, Math.PI * 2, true);
        ctx.fill();//填充绘画路径
    } else {
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(next_pos.x, next_pos.y);
        ctx.lineWidth = DEFAULT_BRUSH_SIZE;
        ctx.strokeStyle = DEFAULT_BRUSH_COLOR;
        ctx.stroke();
        ctx.closePath();
    }
    /****
    *context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    *参数 x,y表示圆心
    *radius半径
    *startAngle起始弧度
    *endAngle终止弧度
    *anticlockwise是否为逆时针方向
    ***/

    //ctx.fill();//填充绘画路径
    ctx.restore();//回复绘画状态

}


// 页面加载完成后执行init函数
window.addEventListener('load', init, false);


// 选择画笔颜色
$('.color div').click(function() {
    $('.color div').removeClass('active');
    $(this).addClass('active');
    DEFAULT_BRUSH_COLOR = $(this).attr('color');
    
})

// 选择画笔粗细
$('.line-width span').not($('.wid-text')).click(function() {
    $('.line-width span').not($('.wid-text')).removeClass('active');
    $(this).addClass('active');
    DEFAULT_BRUSH_SIZE = $(this).attr('wid');
    console.log($(this).attr('wid'));

})

// 清除画布
$('.clear').click(function() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
})

// 画好了
$('.go-share').click(function() {
    var url = canvas.toDataURL("image/png");
    $('.drawing').remove();
    $('.anwser').show();
    $('.hua img').attr('src', url)
    // console.log(canvas.toDataURL("image/png"))
})
