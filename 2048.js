/**
 * Created by gouwa on 2018/4/24.
 */
var data = null,//����4��4�ж�ά����
    RN = 4, CN = 4,
    score = 0,
    startus = 0, GAMEOVER = 0, RUNNING = 1;//����� /����
//��Ϸ��������
function start() {
    //����Ϸ״̬����Ϊ������
    startus = RUNNING;
    score = 0;//��������ʼ��Ϊ0
    //��ʼ��dataΪRN��Cn�и�0Ԫ�صĶ�ά����
    //���������鱣����data��
    data = [];
    for (var r = 0; r < RN; r++) {
        //����������ѹ��data��
        data.push([]);
        for (var c = 0; c < CN; c++) {
            //��data r��ѹ�� 0
            data[r].push(0);
        }
    }
    //�������������
    randomNum();
    randomNum();
    updataView();
    //console.log(data.join("\n"));
    /*�¼����û��ֶ������Ľ���ı�
     ���¼�����ʱ�����Զ������¼�������
     */
    //Ϊҳ��󶨼��̰����¼���
    document.onkeydown = function (e) {
        //��ò��жϼ��̺�
        switch (e.keyCode) {
            case 37://��
                moveLeft();
                break;
            case 38://��
                moveUp();
                break;
            case 39://��
                moveRight();
                break;
            case 40://��
                moveDown();
                break;

        }
    }
}
//���������
function randomNum() {
    //����
    while (1) {
        //0-RN-1֮���������һ��r
        //0-CN-1֮���������һ��c
        r = parseInt(Math.random() * RN);
        c = parseInt(Math.random() * RN);
        if (data[r][c] == 0) {//���data��r��c��Ϊ0
            //�������һ��2��4�������ڱ���v��
            //var v = Math.random()<0.5?2:4;
            //����data��r��r�е�ֵΪv
            //data[r][c]=v;
            data[r][c] = Math.random() < 0.5 ? 2 : 4;
            //�˳�ѭ��
            break;
        }
    }
}
//����ҳ������
function updataView() {
    //����data
    for (var r = 0; r < RN; r++) {
        for (var c = 0; c < CN; c++) {
            //��id���Ҷ�Ӧ��div
            var div = document.getElementById("c" + r + c);
            //���data�е�r��c��Ϊ0
            if (data[r][c] == 0) {
                //���div����
                div.innerHTML = "";
                //���classname
                div.className = "";
            } else//����
            //����div������
                div.innerHTML = data[r][c];
            div.className = "n" + data[r][c];

        }
    }
    //�ҵ�idΪscore��span������������Ϊscore
    document.getElementById("score").innerHTML = score;
    //�ҵ�idάgameover��div
    var div = document.getElementById("gameover");
    //�����Ϸ״̬ΪGAMEOVER
    if (startus == GAMEOVER) {

        //����div��ʾ
        div.style.display = "block";
        //����idΪfinal��span������ΪSCORE
        document.getElementById("final").innerHTML = score;
    } else {//��������div����
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

    //�������� ���ؽ���
    return true;
}


//-----------------------���ƺ���-----------------------
function moveLeft() {//����������
    //Ϊ�������ձ�����before��
    var before = String(data);
    //����data��ÿһ��
    for (var r = 0; r < RN; r++)
        moveLeftInRow(r);
    //���Ƶ�r��
    //Ϊ�������ձ�����after��
    var after = String(data);
    //����������ƶ�before��=after
    if (before != after) {
        randomNum();//�������2��4
        if (isGameover()) startus = GAMEOVER;
        updataView();//����ҳ��
    }


}
function moveLeftInRow(r) {//���Ƶ�r��
    for (var c = 0; c < CN - 1; c++) {//c��0��ʼ����CN-1
        var nextc = getNextInRow(r, c);//����r��c���Ҳ���һ����Ϊ0��λ��nextc
        if (nextc != -1) {//����ҵ�
            if (data[r][c] == 0) { //���r��c�е�ֵΪ0
                data[r][c] = data[r][nextc];//��r��nextcλ�õ�ֵ��ֵ��r��c��
                data[r][nextc] = 0;
                c--;//c����ԭ��
            } else if (data[r][c] == data[r][nextc]) {//����  ���r��c�е�ֵ����r��nextc�е�ֵ
                data[r][c] *= 2;//��r��c�е�ֵ��2
                score += data[r][c];
                data[r][nextc] = 0;//��r��nextcλ�õ�ֵ��Ϊ0
            }
        } else break;
    }
}
function getNextInRow(r, c) {

    //nextc��c+1��ʼ����<CN
    for (var nextc = c + 1; nextc < CN; nextc++) {
        //���r��nextcλ�õ�ֵ��Ϊ0
        if (data[r][nextc] != 0) return nextc;//����nextc

    }
    return -1;
    //����-1
}
//------------------------------���ƺ���----------------------
function moveRight() {
    var before = String(data);
    for (var r = 0; r < RN; r++) {
        moveRightInRow(r);
    }
    var after = String(data);
    if (before != after) {
        randomNum();//�������2��4
        if (isGameover()) startus = GAMEOVER;
        updataView();//����ҳ��
    }

}
//���Ƶ�r��
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
//-------------------------���ƺ���-----------------------------------
function moveUp() {
    var before = String(data);
    for (var c = 0; c < CN; c++) {
        moveUpInRow(c);
    }
    var after = String(data);
    if (before != after) {
        randomNum();//�������2��4
        if (isGameover()) startus = GAMEOVER;
        updataView();//����ҳ��
    }

}
function moveUpInRow(c) {
    for (var r = 0; r < RN; r++) {
        var nextr = getnextrInRow(r, c);
        if (nextr != -1) {
            if (data[r][c] == 0) {
                data[r][c] = data[nextr][c];//��nextr��c��λ�õ�ֵ��ֵ��r��c��
                data[nextr][c] = 0;
                r--;//r����ԭ��
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
//------------------���ƺ���----------------
function moveDown() {
    var before = String(data);
    for (var c = 0; c < RN; c++) {
        moveDownInRow(c);
    }
    var after = String(data);
    if (before != after) {
        randomNum();//�������2��4
        if (isGameover()) startus = GAMEOVER;
        updataView();//����ҳ��
    }

}
function moveDownInRow(c) {
    for (var r = RN - 1; r >= 0; r--) {
        var prevr = getPrevrInRow(r, c);
        if (prevr != -1) {
            if (data[r][c] == 0) {
                data[r][c] = data[prevr][c];//��prevr��c��λ�õ�ֵ��ֵ��r��c��
                data[prevr][c] = 0;
                r++;//r����ԭ��

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













