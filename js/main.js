//canvas obj
var stage=new createjs.Stage("game");

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);

game.width=game.parentNode.offsetWidth;
game.height=game.parentNode.offsetHeight;

//loading
var loadView=new createjs.Container();
var loadText=new createjs.Text("0%", "20px 微软雅黑","#cd0000" );
loadText.regX=loadText.getMeasuredWidth() / 2;
loadText.x=game.width/2;
loadText.y=( game.height-loadText.getMeasuredHeight() )/2;
loadText.alpha=1;
loadView.addChild(loadText);
stage.addChild(loadView);

preload();

function preload(){
	
	var queue=new createjs.LoadQueue();
	queue.installPlugin(createjs.sound);
	
	queue.on("complete",function(){
		
		createjs.Tween.get(loadText)
		.wait(500)
		.to({
			scaleX:0.8,
			scaleY:0.8
		},500,createjs.Ease.backOut)
		.to({
			alpha:0,
			scaleX:1.2,
			scaleY:1.2
		},500,createjs.Ease.backOut)
		.call(init);
		
	},this);
	
	queue.on("progress",function(e){
		var pro=parseInt( queue.progress*100 );
		
		loadText.text=pro+"%";
		loadText.x=game.width/2;
		loadText.y=( game.height-loadText.getMeasuredHeight() )/2;
		
	},this);
	
	queue.loadFile({id:"flap", src:"assets/flap.wav"});
	queue.loadFile({id:"hitGround", src:"assets/ground-hit.wav"});
	queue.loadFile({id:"hitPipe", src:"assets/pipe-hit.wav"});
	queue.loadFile({id:"getScore", src:"assets/score.wav"});
	queue.loadManifest(imgData);
	
}

function init(){
	
		stage.removeChild(loadView);
		stage.update();
		createjs.Ticker.setFPS(20);
		// createjs.Ticker.removeEventListener("tick",stage);

		//加载开始页面
		start();
}

function start(){
	stage.removeAllChildren();
	createBg(); //创建背景
	createGround();//创建地面
	createStartBox(); //创建标题box

}

function createBg(){

	//backLayer
	var backLayer=new createjs.Container();
	stage.addChild(backLayer);

	var bg1=new createjs.Bitmap("assets/background.png");
	//通过缩放来实现平铺效果,这里仍然有一个写死的数据就是图片的实际宽高
	bg1.scaleX=game.width / 288;
	bg1.scaleY=game.height / 505;
	var bg2=bg1.clone();
	bg2.x=288*bg1.scaleX;
	backLayer.addChild(bg1);
	backLayer.addChild(bg2);

	var scrollBg=createjs.Tween.get(backLayer)
	.to({
		x:-288*bg1.scaleX
	},8000);
	scrollBg.loop=true;
};

function createStartBox(){

	//startBox
	var titleBox=new createjs.Container();
	stage.addChild(titleBox);

	//bird
	var spriteSheet=new createjs.SpriteSheet( birdSprite );

	var birdFly=new createjs.Sprite(spriteSheet,"fly");
	birdFly.x=182;
	birdFly.y=60;
	titleBox.addChild(birdFly);
	titleBox.x=(game.width-182) / 2;
	titleBox.y=50;
	var fly=createjs.Tween.get(titleBox)
	.to({
		y:60
	},1000,createjs.Ease.linear)
	.to({
		y:50
	},1000,createjs.Ease.linear);

	fly.loop=true;

	//title
	var title=new createjs.Bitmap("assets/title.png");
	title.y=50;
	titleBox.addChild(title);

	//button
	var buttonBox=new createjs.Container();
	stage.addChild(buttonBox);

	var button=new createjs.Bitmap("assets/start-button.png");
	button.y=(game.height-58) / 2;
	button.x=(game.width-104) / 2;
	buttonBox.addChild(button);

	button.addEventListener("click",function(){


		buttonBox.removeChild(button);

		createjs.Tween.get(titleBox)
		.to({
			x:game.width
		},500,createjs.Ease.backIn)
		.call(gameStart);

	});

}

function createGround(){

	//groundLayer
	var groundLayer=new createjs.Container();
	var g1=new createjs.Bitmap("assets/ground.png");
	g1.scaleX=game.width / 335;
	var g2=g1.clone();
	g2.x=335*g1.scaleX;
	groundLayer.y=game.height-112;
	groundLayer.addChild(g1);
	groundLayer.addChild(g2);
	stage.addChild(groundLayer);

	var scrollGround=createjs.Tween.get(groundLayer)
					 .to({
					 	x:-335*g1.scaleX
					 },2000);
	scrollGround.loop=true;
}

//游戏开始,重绘页面
function gameStart(){

	setTimeout(function(){
		stage.removeAllChildren();
		gameInit();
	},1e3);

}


//游戏初始化
function gameInit(){
	
	//创建readyBox
	createReadyBox();
	
}

//createReadyBox();
function createReadyBox(){
	
	var readyBox=new createjs.Container();
	stage.addChild(readyBox);
	
	//不需要滚动的背景图片
	var bg1=new createjs.Bitmap("assets/background.png");
	bg1.scaleX=game.width / 288;
	bg1.scaleY=game.height / 505;
	readyBox.addChild(bg1);
	
	var ground=new createjs.Bitmap("assets/ground.png");
	ground.scaleX=game.width / 335;
	ground.y=game.height-112
	readyBox.addChild(ground);
	
	var readyTitle=new createjs.Bitmap("assets/get-ready.png");
	readyTitle.x=(game.width-184)/2;
	readyTitle.y=50;
	readyBox.addChild(readyTitle);
	
	var spriteSheet=new createjs.SpriteSheet( birdSprite );
	var bird=new createjs.Sprite( spriteSheet ,"stand"); //绘制一个不动的鸟
	bird.x=game.width*0.2;
	bird.y=120;
	//改变旋转中心点
	bird.regX=17;
	bird.regY=12;
	readyBox.addChild(bird);
	
	var instruct=new createjs.Bitmap("assets/instructions.png");
	instruct.x=(game.width-114)/2;
	instruct.y=(game.height-98)/2;
	readyBox.addChild(instruct);
	
	//点击开始游戏
	readyBox.addEventListener("click",function(){
		//创建移动动画
		stage.removeChild(readyBox);
		gameMove();

	});
}

//给鸟一个重力
var gravity=6;
//给鸟一个跳动的速度
var speed=40;
function gameMove(){

	createBg();
	createGround();
	var bird=createGameBox();
	createjs.Ticker.addEventListener("tick",function(){
		birdMove(bird,gravity);
	});

}

// createGameBox();
function createGameBox(){
	var gameBox=new createjs.Container();
	stage.addChild(gameBox);

	//在原坐标处绘制一个飞动的小鸟
	var spriteSheet=new createjs.SpriteSheet( birdSprite );
	var bird=new createjs.Sprite( spriteSheet ,"fly"); //绘制一个不动的鸟
	bird.x=game.width*0.2;
	bird.y=120;
	//改变旋转中心点
	bird.regX=17;
	bird.regY=12;
	gameBox.addChild(bird);

	stage.addEventListener("click",function(){

		createjs.Tween.get(bird)
		.to({
			y:bird.y-speed,
			rotation:-30,
		},200,createjs.Ease.easeOut)
		.call(function(){
			//运动结束以后模拟初速度为0，重力加速度还原
			gravity=6;
		})

	});
	return bird;
}

//不断上下移动的鸟
function birdMove(bird,gravity){

	gravity+=4;
	bird.y+=gravity;
	//往下掉
	if(bird.rotation<90){
		bird.rotation+=3;
	}
	//与地板的碰撞检测
	var hitHeight=game.height-112-12;
	if(bird.y>=hitHeight){
		bird.y=hitHeight; //地板的距离加上鸟的中心点的距离
	}
}