var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

var lineWidth = 5;

autoSetCanvasSize(yyy);

listenToMouse(yyy);

//监听各个icon事件
//默认使用pen，所以eraser关闭
var pen = document.getElementById('pen');
var eraser = document.getElementById('eraser');
var clear = document.getElementById('clear');
var download = document.getElementById('download');

var eraserEnabled = false;
pen.onclick = function() {
    eraserEnabled = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
};
eraser.onclick = function() {
    eraserEnabled = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
};
clear.onclick = function() {
    context.clearRect(0, 0, yyy.width, yyy.height);
};
download.onclick = function() {
    var url = yyy.toDataURL("image/png");
    // console.log(url);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = "自定义图画.png";
    a.target = "_blank";
    a.click();
}
//选择画笔颜色
// var red = document.getElementById('red');
red.onclick = function(element) {
    if(!red.className.includes("active")) {
        context.fillStyle = 'red';
        context.strokeStyle = "red";
        red.classList.add("active");
        green.classList.remove("active");
        blue.classList.remove("acaative");
    } else {
        context.fillStyle = "black";
        context.strokeStyle = "black";
        red.classList.remove("active");
    }
    // context.fillstyle = 'red';
    // context.strokeStyle = "red";
    // red.classList.add("active");
    // green.classList.remove("active");
    // blue.classList.remove("acaative");
};
green.onclick = function() {
    context.fillStyle = 'green';
    context.strokeStyle = 'green';
    red.classList.remove("active");
    green.classList.add("active");
    blue.classList.remove("active");
};
blue.onclick = function() {
    context.fillStyle = 'blue';
    context.strokeStyle = "blue";
    red.classList.remove("active");
    green.classList.remove("active");
    blue.classList.add("active");
};

//画笔粗细
thin.onclick = function() {
    lineWidth = 5;
}

thick.onclick = function() {
    lineWidth = 10;
}


//鼠标监听事件
function listenToMouse(canvas) {
    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    };

    //特性检测
    //分别检测PC端和手机端
    if (document.body.ontouchstart !== undefined) {
        //检测为手机端
        canvas.ontouchstart = function(e) {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            console.log(x, y);
            using = true;
            if (eraserEnabled) {
                context.clearRect(x-5, y-5, 10, 10);
            } else {
                lastPoint = {
                    x: x,
                    y: y
                };
            }
        };
        canvas.ontouchmove = function(e) {
            console.log("touch移动中");
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            if(!using) {return};
            if(eraserEnabled) {
                context.clearRecr(x-5, y-5, 10, 10);
            } else {
                var newPoint = {
                    x: x,
                    y: y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        };
        canvas.ontouchend = function(e) {
            console.log("touch结束");
            using = false;
        }
    }

    //鼠标点击
    canvas.onmousedown = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        console.log(x,y);
        using = true;
        if (eraserEnabled) {
            context.clearRect(x-5, y-5, 10, 10);
        } else {
            lastPoint = {
                x: x,
                y: y
            }
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
    // context.strokeStyle = "black"; //当有选择颜色时，有这条就覆盖前面的选择了
    context.moveTo(x1, y1);
    context.lineWidth = lineWidth;
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


// var brush = document.getElementById('brush');
// var eraser = document.getElementById('eraser');
// var eraserEnabled = false; //橡皮擦默认关闭
// eraser.onclick = function() {
//     eraserEnabled = true; //激活橡皮擦状态
//     actions.className = 'actions x'; //切换画笔按钮
// };
// brush.onclick = function() {
//     eraserEnabled = false; //关闭橡皮擦
//     actions.className = 'actions'; //切换橡皮擦按钮
// };
