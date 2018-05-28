/**
 * Created by gouwa on 2018/4/24.
 */
var data = null,//保存4行4列二维数组
    RN = 4, CN = 4,
    score = 0,
    startus = 0, GAMEOVER = 0, RUNNING = 1;//最大行 /列数
//游戏启动函数
function start() {
    //将游戏状态重置为运行中
    startus = RUNNING;
    score = 0;//将分数初始化为0
    //初始化data为RN行Cn列个0元素的二维数组
    //创建空数组保存在data中
    data = [];
    for (var r = 0; r < RN; r++) {
        //创建空数组压入data中
        data.push([]);
        for (var c = 0; c < CN; c++) {
            //向data r行压入 0
            data[r].push(0);
        }
    }
    //生成两个随机数
    randomNum();
    randomNum();
    updataView();
    //console.log(data.join("\n"));
    /*事件：用户手动触发的界面改变
     当事件发生时，会自动触发事件处理函数
     */
    //为页面绑定键盘按下事件：
    document.onkeydown = function (e) {
        //获得并判断键盘号
        switch (e.keyCode) {
            case 37://左
                moveLeft();
                break;
            case 38://上
                moveUp();
                break;
            case 39://右
                moveRight();
                break;
            case 40://下
                moveDown();
                break;

        }
    }
}
//随机数函数
function randomNum() {
    //反复
    while (1) {
        //0-RN-1之间随机生成一个r
        //0-CN-1之间随机生成一个c
        r = parseInt(Math.random() * RN);
        c = parseInt(Math.random() * RN);
        if (data[r][c] == 0) {//如果data中r行c列为0
            //随机生成一个2或4，保存在变量v中
            //var v = Math.random()<0.5?2:4;
            //设置data中r行r列的值为v
            //data[r][c]=v;
            data[r][c] = Math.random() < 0.5 ? 2 : 4;
            //退出循环
            break;
        }
    }
}
//更新页面数据
function updataView() {
    //遍历data
    for (var r = 0; r < RN; r++) {
        for (var c = 0; c < CN; c++) {
            //用id查找对应的div
            var div = document.getElementById("c" + r + c);
            //如果data中的r行c列为0
            if (data[r][c] == 0) {
                //清空div内容
                div.innerHTML = "";
                //清空classname
                div.className = "";
            } else//否则
            //设置div的内容
                div.innerHTML = data[r][c];
            div.className = "n" + data[r][c];

        }
    }
    //找到id为score的span，设置其内容为score
    document.getElementById("score").innerHTML = score;
    //找到id维gameover的div
    var div = document.getElementById("gameover");
    //如果游戏状态为GAMEOVER
    if (startus == GAMEOVER) {

        //设置div显示
        div.style.display = "block";
        //设置id为final的span的内容为SCORE
        document.getElementById("final").innerHTML = score;
    } else {//否则。设置div隐藏
        div.style.display = "none";
    }

}
function isGameover() {
    for (var r = 0; r < RN; r++) {
        for (var c = 0; c < CN; c++) {
            if (data[r][c] == 0) return false;
            if (c < CN - 1 && data[r][c] == data[r][c + 1]) return false;
            if (r < RN - 1 && data[r][c] == data[r + 1][c]) return false;

        }
    }

    //遍历结束 返回结束
    return true;
}


//-----------------------左移函数-----------------------
function moveLeft() {//左移所有行
    //为数组拍照保存在before中
    var before = String(data);
    //遍历data中每一行
    for (var r = 0; r < RN; r++)
        moveLeftInRow(r);
    //左移第r行
    //为数组拍照保存在after中
    var after = String(data);
    //如果发生了移动before！=after
    if (before != after) {
        randomNum();//随机生成2或4
        if (isGameover()) startus = GAMEOVER;
        updataView();//更新页面
    }


}
function moveLeftInRow(r) {//左移第r行
    for (var c = 0; c < CN - 1; c++) {//c从0开始，到CN-1
        var nextc = getNextInRow(r, c);//查找r行c列右侧下一个不为0的位置nextc
        if (nextc != -1) {//如果找到
            if (data[r][c] == 0) { //如果r行c列的值为0
                data[r][c] = data[r][nextc];//将r行nextc位置的值赋值给r行c列
                data[r][nextc] = 0;
                c--;//c留在原地
            } else if (data[r][c] == data[r][nextc]) {//否则  如果r行c列的值等于r行nextc列的值
                data[r][c] *= 2;//将r行c列的值乘2
                score += data[r][c];
                data[r][nextc] = 0;//将r行nextc位置的值置为0
            }
        } else break;
    }
}
function getNextInRow(r, c) {

    //nextc从c+1开始，到<CN
    for (var nextc = c + 1; nextc < CN; nextc++) {
        //如果r行nextc位置的值不为0
        if (data[r][nextc] != 0) return nextc;//返回nextc

    }
    return -1;
    //返回-1
}
//------------------------------右移函数----------------------
function moveRight() {
    var before = String(data);
    for (var r = 0; r < RN; r++) {
        moveRightInRow(r);
    }
    var after = String(data);
    if (before != after) {
        randomNum();//随机生成2或4
        if (isGameover()) startus = GAMEOVER;
        updataView();//更新页面
    }

}
//右移第r行
function moveRightInRow(r) {
    for (var c = CN - 1; c >= 0; c--) {
        var prevc = getPrevInRow(r, c);
        if (prevc != -1) {
            if (data[r][c] == 0) {
                data[r][c] = data[r][prevc];
                data[r][prevc] = 0;
                c++;
            }
            else if (data[r][c] == data[r][prevc]) {
                data[r][c] *= 2;
                score += data[r][c];
                data[r][prevc] = 0;
            }
        } else break;
    }
}
function getPrevInRow(r, c) {
    for (var prevc = c - 1; prevc >= 0; prevc--) {
        if (data[r][prevc] != 0) return prevc;
    }
    return -1;
}
//-------------------------上移函数-----------------------------------
function moveUp() {
    var before = String(data);
    for (var c = 0; c < CN; c++) {
        moveUpInRow(c);
    }
    var after = String(data);
    if (before != after) {
        randomNum();//随机生成2或4
        if (isGameover()) startus = GAMEOVER;
        updataView();//更新页面
    }

}
function moveUpInRow(c) {
    for (var r = 0; r < RN; r++) {
        var nextr = getnextrInRow(r, c);
        if (nextr != -1) {
            if (data[r][c] == 0) {
                data[r][c] = data[nextr][c];//将nextr行c列位置的值赋值给r行c列
                data[nextr][c] = 0;
                r--;//r留在原地
            }
            else if (data[r][c] == data[nextr][c]) {
                data[r][c] *= 2;
                score += data[r][c];
                data[nextr][c] = 0;
            }
        } else break;

    }
}
function getnextrInRow(r, c) {
    for (var nextr = r + 1; nextr < RN; nextr++) {
        if (data[nextr][c] != 0) return nextr;
    }
    return -1;
}
//------------------下移函数----------------
function moveDown() {
    var before = String(data);
    for (var c = 0; c < RN; c++) {
        moveDownInRow(c);
    }
    var after = String(data);
    if (before != after) {
        randomNum();//随机生成2或4
        if (isGameover()) startus = GAMEOVER;
        updataView();//更新页面
    }

}
function moveDownInRow(c) {
    for (var r = RN - 1; r >= 0; r--) {
        var prevr = getPrevrInRow(r, c);
        if (prevr != -1) {
            if (data[r][c] == 0) {
                data[r][c] = data[prevr][c];//将prevr行c列位置的值赋值给r行c列
                data[prevr][c] = 0;
                r++;//r留在原地

            } else if (data[r][c] == data[prevr][c]) {
                data[r][c] *= 2;
                score += data[r][c];
                data[prevr][c] = 0;
            }
        } else break;
    }

}
function getPrevrInRow(r, c) {
    for (var prevr = r - 1; prevr >= 0; prevr--) {
        if (data[prevr][c] != 0) return prevr;
    }
    return -1;
}

start();













