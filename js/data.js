//预加载图片数据
var imgData=[
		{
			id:"bg",
			src:"assets/background.png"
		},
		{
			id:"bird",
			src:"assets/bird.png"
		},
		{
			id:"ground",
			src:"assets/ground.png"
		},
		{
			id:"overTitle",
			src:"assets/game-over.png"
		},
		{
			id:"getReady",
			src:"assets/get-ready.png"
		},
		{
			id:"board",
			src:"assets/scoreboard.png"
		},
		{
			id:"pipe",
			src:"assets/pipes.png"
		}
];

//雪碧图
var birdSprite={
	images:["assets/bird.png"],
	frames:{
		width:34,
		height:24,
		counts:3
	},
	animations:{
		stand:2, //表示第三帧
		fly:[0,2]
	}
}