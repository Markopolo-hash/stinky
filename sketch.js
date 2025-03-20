let player;
let walls;
let img, ringImg;
let rings = 0;
let spring;
let backGround;
let score=0
function preload () {
	img = loadImage('sonic mania sonic.png')
	ringImg = loadImage('Rings.png')
	backGround = loadImage('Background 2.png')
}

function setup() {
	new Canvas(1000, 1000);
	displayMode('centered');
	world.gravity.y = 20;
	player = new Sprite(200,1000)
	player.w = 48;
	player.h = 48;
	player.rotationLock = true
	player.spriteSheet = img;
		player.anis.frameDelay = 4;
		player.friction = 0;

		player.addAnis( {
		stand: { row:0 },
		duck: { row: 3, frames: 5},
		run: { row: 1, frames:  12},
		jump: { row: 2, frames: 16}
	});
player.changeAni('stand')

	rings = new Group()
	rings.w = 16
	rings.h = 16
	rings.spriteSheet = ringImg;
	rings.anis.frameDelay = 6;
	rings.tile = "o";

	rings.addAnis( {
		spin: {row:0, frames: 8},
	});


	



	player.overlaps(rings,collect)

	walls = new Group();
	walls.w = 50;
	walls.h = 50;
	walls.tile = "-";
	walls.collider = 'static';

	ground = new Group();
	ground.w = 50;
	ground.h = 50;
	ground.tile = "=";
	ground.collider = 'static';

	goal = new Group();
	goal.w = 40;
	goal.h = 60;
	goal.tile = "G"
	goal.collider = 'none';

	
	tileMap = new Tiles(
		['========================================',
		 '-......................................-',
		 '-......................................-',
		 '-......................................-',
		 '-.................................o....-',
		 '-..............................o..=....-',
		 '-o.............................=.......-',
		 '-=..........................o..........-',
		 '-...........................=...o......-',
		 '-...............................=...oo.-',
		 '-...................................==.-',
		 '-......................................-',
		 '-..................................oo..-',
		 '-..................................==..-',
		 '-........................oo............-',
		 '-........................==............-',
		 '-................................oo....-',
		 '-......................................-',
		 '-................................==....-',
		 '-.....................................G-',
		 '======================================='],
		50,
		50,
		walls.w,
		walls.h
	);

	
}

function draw() {
	camera.zoom = 1.5;
	camera.x = player.x;
	camera.y = player.y;
	background('skyblue');

	controls()
	fill(0)
	textSize(30)
	text("Rings: " + score,100,100)
	
}

function controls(){

	if(kb.pressing('a')){
		//player.changeAni('run')
		player.vel.x -= 0.5;
		player.mirror.x = true 
	}
	else if(kb.pressing('d')){
		//player.changeAni('run')
		player.vel.x += 0.5;
		player.mirror.x = false
	}
	
	else{
		player.vel.x = 0
		//player.changeAni('stand')
	}

	if(kb.pressing('space') && player.colliding(ground))
	{
		//player.changeAni(['jump','stand'])
		player.vel.y = -10;
	}
//  if(player.vel.y <0){
// 	 	player.changeAni('jump')
// 	 }
	 if(player.vel.x ==0 && player.vel.y ==0){
		//player.changeAni('stand')
	}

console.log(floor(player.vel.y))
	if(player.vel.x < 0 || player.vel.x > 0){
		player.changeAni('run')
	}
	else if(floor(player.vel.y) < -2){
		player.changeAni('jump')
	}else if(player.vel.y >-1 && player.vel.y <1 ){
		player.changeAni('stand')
	}
	
}


function springs () {
if(player.collides(spring)) {
	player.vel.y = -20;
}
}
function collect(player,item){
	score +=1;
item.remove()
}
