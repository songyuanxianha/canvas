var tangram = document.getElementById('tangram');
if(tangram.getContext) {
    var cxt = tangram.getContext('2d');
    // 存储画的点
    var rangramArr = [
        {
            p: [{x: 0, y: 0}, {x: 200, y: 0}, {x: 0, y: 200}],
            color: '#64ccef'
        },
        {
            p: [{x: 200, y:0}, {x: 400, y: 0}, {x: 300, y: 100}, {x: 100, y: 100}],
            color: '#f7ee31'
        },
        {
            p: [{x: 100, y:100}, {x: 200, y: 200}, {x: 100, y: 300}, {x: 0, y: 200}],
            color: '#a453a2'
        },
        {
            p: [{x: 100, y:100}, {x: 300, y: 100}, {x: 200, y: 200}],
            color: '#71bf47'
        },
        {
            p: [{x: 400, y:0}, {x: 400, y: 400}, {x: 200, y: 200}],
            color: '#ef1d26'
        },
        {
            p: [{x: 0, y:200}, {x: 100, y: 300}, {x: 0, y: 400}],
            color: '#fdc661'
        },
        {
            p: [{x: 200, y:200}, {x: 400, y: 400}, {x: 0, y: 400}],
            color: '#3e53a4'
        }
    ];
    // 循环画每一块
    for (var i = 0; i < rangramArr.length; i++) {
        draw(rangramArr[i], cxt);
    }
    // 画每一块
    function draw(point, ctx) {
        ctx.beginPath();
        ctx.moveTo(point.p[0].x, point.p[0].y);
        for (var j = 0; j < point.p.length; j++) {
            ctx.lineTo(point.p[j].x, point.p[j].y);
        }
        ctx.closePath(); // closePath()可以自动将路径闭合,不用lineTo到开始点
        ctx.fillStyle =point.color;
        ctx.fill();
    }
}