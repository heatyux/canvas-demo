var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy);

listenToMouse(yyy);


//鼠标监听事件
function listenToMouse(canvas) {
    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    };

    //鼠标点击
    canvas.onmousedown = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        console.log(x,y);
        using = true;
        lastPoint = {
            x: x,
            y: y
        }
    };

    //鼠标移动
    canvas.onmousemove = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        if(!using) {return} //用来判断onmousedown是否执行
        //监听是否激活橡皮擦
        if (eraserEnabled) {
            //激活橡皮擦，使用清除功能
            context.clearRect(x-5, y-5, 10, 10);
        }else {
            //无激活橡皮擦，继续使用画笔功能
            var newPoint = {
                x: x,
                y: y
            };
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
        }
    }

    //鼠标松开
    canvas.onmouseup = function(e) {
        using = false;
    }
}

// 两点画线
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = "black";
    context.moveTo(x1, y1);
    context.lineWidth = 5
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

//设置自定义视口宽高
function autoSetCanvasSize(canvas) {
    setCanvasSize();

    //浏览器视口宽高度变化时获取实时宽高
    window.onresize = function() {
        setCanvasSize();
    };
    
    //设置视口宽高
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth; //视口宽度
        var pageHeight = document.documentElement.clientHeight; //视口高度
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

//监听橡皮擦状态
var brush = document.getElementById('brush');
var eraser = document.getElementById('eraser');

var eraserEnabled = false; //橡皮擦默认关闭
eraser.onclick = function() {
    eraserEnabled = true; //激活橡皮擦状态
    actions.className = 'actions x'; //切换画笔按钮
};
brush.onclick = function() {
    eraserEnabled = false; //关闭橡皮擦
    actions.className = 'actions'; //切换橡皮擦按钮
};
