//musicplayer
var music=document.getElementById("music");
var prevbtn=document.getElementById("prevbtn");
var playbtn=document.getElementById("playbtn");
var nextbtn=document.getElementById("nextbtn");
const audio=document.createElement("audio");
var song=1,play=false;
audio.src="music/"+song+".mp3";
audio.volume=0.1;
audio.loop=true;
function PlayAudio(){
    audio.play();
    playbtn.style.backgroundImage="url('music/pause.png')";
}
function PauseAudio(){
    audio.pause();
    playbtn.style.backgroundImage="url('music/play.png')";
}
function NextAudio(){
    if(song == 7)song = 0;
    song++;
    audio.src = "music/"+song+".mp3";
}
function PrevAudio(){
    if(song == 1)song = 8;
    song--;
    audio.src = "music/"+song+".mp3";
}
prevbtn.onclick = function(event){
    PrevAudio();
    PlayAudio();
}
nextbtn.onclick = function(event){
    NextAudio();
    PlayAudio();
}
playbtn.onclick = function(event){
    if(play)PlayAudio();
    else PauseAudio();
    play=!play;
}
//touchcharacter
var player1=document.getElementById("player1");
var player2=document.getElementById("player2");
const voice = document.createElement("audio");
voice.volume=0.5;
player1.onclick = function(event){
    voice.src = "character/m4a/p1_click.m4a";
    voice.play();
}
player2.onclick = function(event){
    voice.src = "character/m4a/e"+turn+"click.m4a";
    voice.play();
}
//controller
var atkbtn=document.getElementById("atkbtn");
var defbtn=document.getElementById("defbtn");
var recbtn=document.getElementById("recbtn");
var ntnbtn=document.getElementById("ntnbtn");
var rbtbtn=document.getElementById("rbtbtn");
atkbtn.onclick = function(event){
    Decide(1);
}
defbtn.onclick = function(event){
    Decide(2);
}
recbtn.onclick = function(event){
    Decide(3);
}
ntnbtn.onclick = function(event){
    Reboot();
}
rbtbtn.onclick = function(event){
    turn=4;
    Reboot();
}
//dice
function Dice(){
    dice.style.display="";
    setTimeout(function(){dice.style.display="none"},3000);
}
//random
function GetRan(n){
    return Math.floor(Math.random()*n)+1;
}
//game
var win=document.getElementById("win");
var lose=document.getElementById("lose");
var text=document.getElementById("text");
const enemyHp=[25,16,30,24];
const enemyPP=[12,20,10,18];
var playerchx=[];
var Hp=[20,0];
var PP=[15,0];
var turn=0;
const Choose=['','攻擊','防禦','回魔'];
function Decide(p1_choose){
    let p2_choose=GetRan(3);
    if(PP[0]<6){
        switch(PP[0]){
            case 5:
                if(GetRan(2)>1)p2_choose=1;
                break;
            case 4:
                if(GetRan(3)>1)p2_choose=1;
                break;
            case 3:
                if(GetRan(4)>1)p2_choose=1;
                break;
            default:
                p2_choose=1;
                break;
        }
    }
    if(PP[1]<6){
        switch(PP[1]){
            case 5:
                if(GetRan(6)<3)p2_choose=3;
                break;
            case 4:
                if(GetRan(6)<4)p2_choose=3;
                break;
            case 3:
                if(GetRan(6)<5)p2_choose=3;
                break;
            default:
                p2_choose=3;
                break;
        }
    }
    text.innerHTML=`你選擇${Choose[p1_choose]},對手選擇${Choose[p2_choose]}`;
    player1_choose.style.top=`${screen.clientHeight-150}px`;
    player1_choose.style.left=`${32}px`;
    player2_choose.style.top=`${screen.clientHeight-150}px`;
    player2_choose.style.left=`${screen.clientWidth-96}px`;
    if(p1_choose==1){
        player1_choose.style.backgroundImage="url('others/atk.png')";
        voice.src="character/m4a/p1_atk.m4a";
    }
    if(p1_choose==2){
        player1_choose.style.backgroundImage="url('others/def.png')";
        voice.src="character/m4a/p1_def.m4a";
    }
    if(p1_choose==3){
        player1_choose.style.backgroundImage="url('others/rec.png')";
        voice.src="character/m4a/p1_rec.m4a";
    }
    voice.play();
    if(p2_choose==1)player2_choose.style.backgroundImage="url('others/atk.png')";
    if(p2_choose==2)player2_choose.style.backgroundImage="url('others/def.png')";
    if(p2_choose==3)player2_choose.style.backgroundImage="url('others/rec.png')";
    player1_choose.style.display="";
    player2_choose.style.display="";
    Animate(p1_choose,p2_choose);
}
function Animate(p1,p2){
    let p1x=parseInt(player1_choose.style.left.replace('px',''));
    let p2x=parseInt(player2_choose.style.left.replace('px',''));
    if(p2x-p1x<50)Animate2(p1,p2);
    else{
        player1_choose.style.left=`${p1x+1}px`;
        player2_choose.style.left=`${p2x-1}px`;
        setTimeout(function(){Animate(p1,p2)},1);
    }
}
function Animate2(p1,p2){
    let p1x=parseInt(player1_choose.style.left.replace('px',''));
    let p2x=parseInt(player2_choose.style.left.replace('px',''));
    if(p2x-p1x<200){
        player1_choose.style.left=`${p1x-5}px`;
        player2_choose.style.left=`${p2x+5}px`;
        setTimeout(function(){Animate2(p1,p2)},2);
    }else{
        dice.style.display="";
        setTimeout(function(){Battle(p1,p2);},3000);
    }
}
function Battle(p1,p2){
    dice.style.display="none";
    player1_choose.style.display="none";
    player2_choose.style.display="none";
    let result1=0,result2=0;
    const dice1=GetRan(6),dice2=GetRan(6);
    text.innerHTML+=`<br>擲骰中. 擲骰中.. 擲骰中...<br>你的點數是${dice1}，對手的點數是${dice2}<br>`;
    if(p1==1&&p2==1){
        if(dice1>dice2){
            result2=dice1;
            text.innerHTML+=`對手無法攻擊到你，而你對他造成了${result2}點傷害`;
            voice.src=`character/m4a/e${turn}hurt.m4a`;
            voice.play();
        }
        else if(dice1<dice2){
            result1=dice2;
            text.innerHTML+=`你無法攻擊到對手，而他對你造成了${result1}點傷害`;
            voice.src="character/m4a/p1_hurt.m4a";
            voice.play();
        }else text.innerHTML+="高手過招，無人受傷";
    }
    if(p1==2&&p2==2)text.innerHTML+="無人出手，防個寂寞";
    if(p1==1&&p2==2){
        if(dice1>dice2){ 
            result2=dice1-dice2; 
            text.innerHTML+=`你對對手造成了${result2}點傷害`; 
            voice.src=`character/m4a/e${turn}hurt.m4a`;
            voice.play();
        }
        if(dice1<dice2){
            result1=dice2-dice1;
            text.innerHTML+=`對手對你造成了${result1}點傷害，並回復了${result1}點血量`;
            Hp[1]+=result1;
            voice.src="character/m4a/p1_hurtbydef.m4a";
            voice.play();
        }
        if(dice1==dice2)text.innerHTML+=`雙方皆損失了${dice1}點能量`;
    }
    if(p1==2&&p2==1){
        if(dice1<dice2){ 
            result1=dice2-dice1;
            text.innerHTML+=`對手對你造成了${result1}點傷害`; 
            voice.src="character/m4a/p1_hurt.m4a";
            voice.play();
        }
        if(dice1>dice2){ 
            result2=dice1-dice2; 
            text.innerHTML+=`你對對手造成了${result2}點傷害，並回復了${result2}點血量`; 
            Hp[0]+=result2; 
            voice.src=`character/m4a/e${turn}hurtbydef.m4a`;
            voice.play();
        }
        if(dice1==dice2)text.innerHTML+="高手過招，無人受傷";
    }
    if(p1==3&&p2==3){text.innerHTML+=`你回復了${dice1}點能量，對手回復了${dice2}點能量`; PP[0]+=dice1*2; PP[1]+=dice2*2;}
    if(p1==2&&p2==3){text.innerHTML+=`對手回復了${dice2}點能量，你白白損失了${dice1}點能量`; PP[1]+=dice2*2;}
    if(p1==3&&p2==2){text.innerHTML+=`你回復了${dice1}點能量，對手白白損失了${dice2}點能量`; PP[0]+=dice1*2;}
    if(p1==1&&p2==3){ 
        result2=dice1; 
        text.innerHTML+=`對手回復了${dice2}點能量，你對他造成了${result2}點傷害`; 
        PP[1]+=dice2*2; 
        voice.src=`character/m4a/e${turn}hurt.m4a`;
        voice.play();
    }
    if(p1==3&&p2==1){
        result1=dice2;
        text.innerHTML+=`對手對你造成了${result1}點傷害，你回復了${dice1}點能量`; 
        PP[0]+=dice1*2;
        voice.src="character/m4a/p1_hurt.m4a";
        voice.play();
    }
    Hp[0]-=result1; Hp[1]-=result2; PP[0]-=dice1; PP[1]-=dice2;
    if(Hp[0]>0&&Hp[1]>0&&PP[0]>=0&&PP[1]>=0){
        text.innerHTML+=`<br>你現在有${Hp[0]}點血量，${PP[0]}點能量`;
        if(screen.clientWidth<580)text.innerHTML+=`<br>對手現在有${Hp[1]}點血量，${PP[1]}點能量`;
        else text.innerHTML+=` 對手現在有${Hp[1]}點血量，${PP[1]}點能量`;
        DrawHpPP();
        Character();
    }else{
        atkbtn.style.display="none";
        defbtn.style.display="none";
        recbtn.style.display="none";
        player1_choose.style.display="none";
        player2_choose.style.display="none";
        text.innerHTML+="<br>";
        if(Hp[0]<=0||PP[0]<0){
            if(Hp[0]<=0)text.innerHTML+="血量歸零,";
            if(PP[0]<0)text.innerHTML+="魔力枯竭,";
            text.innerHTML+="You Lose!";
            lose.style.display="";
            rbtbtn.style.display="";
            voice.src="character/m4a/p1_lose.m4a";
            voice.play();
            text.innerHTML+="<br>本遊戲由夜颯製作，感謝您的遊玩";
        }else {
            text.innerHTML+="對手";
            if(Hp[1]<=0)text.innerHTML+="血量歸零,";
            if(PP[1]<0)text.innerHTML+="魔力枯竭,";
            text.innerHTML+="You Win!";
            win.style.display="";
            if(turn!=4){
                voice.src="character/m4a/p1_next.m4a";
                ntnbtn.style.display="";
            }else{
                voice.src="character/m4a/p1_win.m4a";
                rbtbtn.style.display="";
            }
            voice.play();
        }
    }
}
function Reboot(){
    turn++;
    if(turn==5){
        turn=1;
        Hp[0]=20;
        PP[0]=15;
    }
    Hp[0]+=10;
    PP[0]+=5;
    Hp[1]=enemyHp[turn-1];
    PP[1]=enemyPP[turn-1];
    text.innerHTML="";
    atkbtn.style.display="";
    defbtn.style.display="";
    recbtn.style.display="";
    player1.style.display="";
    player2.style.display="";
    win.style.display="none";
    lose.style.display="none";
    dice.style.display="none";
    ntnbtn.style.display="none";
    rbtbtn.style.display="none";
    player1_choose.style.display="none";
    player2_choose.style.display="none";
    voice.src="character/m4a/p1_start.m4a";
    voice.play();
    DrawHpPP();
    Character();
}
function Character(){
    if(Hp[0]>20)player1.style.backgroundImage="url('character/p1_0.png')";
    if(Hp[0]<=20)player1.style.backgroundImage="url('character/p1_1.png')";
    if(Hp[0]<=15)player1.style.backgroundImage="url('character/p1_2.png')";
    if(Hp[0]<=10)player1.style.backgroundImage="url('character/p1_3.png')";
    if(Hp[0]<=5)player1.style.backgroundImage="url('character/p1_4.png')";
    if(turn==1){
        if(Hp[1]>20)player2.style.backgroundImage="url('character/e1_0.png')";
        if(Hp[1]<=20)player2.style.backgroundImage="url('character/e1_1.png')";
        if(Hp[1]<=15)player2.style.backgroundImage="url('character/e1_2.png')";
        if(Hp[1]<=10)player2.style.backgroundImage="url('character/e1_3.png')";
        if(Hp[1]<=5)player2.style.backgroundImage="url('character/e1_4.png')";
    }
    if(turn==2)player2.style.backgroundImage="url('character/e2_0.png')";
    if(turn==3){
        if(Hp[1]>21)player2.style.backgroundImage="url('character/e3_0.png')";
        if(Hp[1]<=21)player2.style.backgroundImage="url('character/e3_1.png')";
        if(Hp[1]<=14)player2.style.backgroundImage="url('character/e3_2.png')";
        if(Hp[1]<=7)player2.style.backgroundImage="url('character/e3_3.png')";
    }
    if(turn==4){
        if(Hp[1]>20)player2.style.backgroundImage="url('character/e4_0.png')";
        if(Hp[1]<=20)player2.style.backgroundImage="url('character/e4_1.png')";
        if(Hp[1]<=15)player2.style.backgroundImage="url('character/e4_2.png')";
        if(Hp[1]<=10)player2.style.backgroundImage="url('character/e4_3.png')";
        if(Hp[1]<=5)player2.style.backgroundImage="url('character/e4_4.png')";
    }
}
//start
var start=document.getElementById("start");
var dice=document.getElementById("dice");
var player1_choose=document.getElementById("player1-choose");
var player2_choose=document.getElementById("player2-choose");
//screen
var screen=document.getElementById("screen");
var board=document.getElementById("board");
var ctx=board.getContext('2d');
function DrawHpPP(){
    var swid=screen.clientWidth;
    var shei=screen.clientHeight;
    board.setAttribute("height",`${shei}px`);
    board.setAttribute("width",`${swid}px`);
    ctx.clearRect(0, 0, swid, 20);
    ctx.beginPath();
    ctx.fillStyle="#FF0000";
    ctx.moveTo(0,0);
    ctx.lineTo(5*Hp[0],0);
    ctx.lineTo(5*Hp[0],15);
    ctx.lineTo(0,15);
    ctx.fill();
    ctx.moveTo(swid,0);
    ctx.lineTo(swid-5*Hp[1],0);
    ctx.lineTo(swid-5*Hp[1],15);
    ctx.lineTo(swid,15);
    ctx.fill();
    ctx.closePath();
    ctx.font="15px sans-serif";
    ctx.fillStyle="#00DDDD";
    ctx.fillText("Hp:"+Hp[0],0,12);
    ctx.fillText("Hp:"+Hp[1],swid-50,12);

    ctx.clearRect(0, 20, swid,40);
    ctx.beginPath();
    ctx.fillStyle="#00DDDD";
    ctx.moveTo(0,20);
    ctx.lineTo(5*PP[0],20);
    ctx.lineTo(5*PP[0],35);
    ctx.lineTo(0,35);
    ctx.fill();
    ctx.moveTo(swid,20);
    ctx.lineTo(swid-5*PP[1],20);
    ctx.lineTo(swid-5*PP[1],35);
    ctx.lineTo(swid,35);
    ctx.fill();
    ctx.closePath();
    ctx.font="15px sans-serif";
    ctx.fillStyle="#FF0000";
    ctx.fillText("PP:"+PP[0],0,33);
    ctx.fillText("PP:"+PP[1],swid-50,33);
}
function RePlace(){
    DrawHpPP();
    var swid=screen.clientWidth;
    var shei=screen.clientHeight;
    music.style.top=(shei/7)+'px';
    music.style.left=(swid/2-50)+'px';
    player1.style.top=(shei-150)+'px';
    player1.style.left='50px';
    player2.style.top=(shei-150)+'px';
    player2.style.left=(swid-170)+'px';
}
window.onresize=()=>{
    RePlace();
}
//load
function Start(){
    start.onclick = function(event){
        Reboot();
        RePlace();
        DrawHpPP();
        Character();
        PlayAudio();
        alert("遊戲開始");
        start.style.display="none";
    }
}
window.addEventListener("load",Start,false);
