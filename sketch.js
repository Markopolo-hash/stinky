let player;
let bigRing;
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
	bigRingImg = loadImage('big ring mania.png')
	motobug = loadImage('motobug.png')
}

function setup() {
	new Canvas(1000, 1000);
	displayMode('centered');
	world.gravity.y = 20;
	player = new Sprite(200,900)
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
	rings.scale = 1.5;

	rings.addAnis( {
		spin: {row:0, frames: 8},
	});


	bigRing = new Group()
	bigRing.w = 64
	bigRing.h = 64
	bigRing.spriteSheet = bigRingImg;
	bigRing.anis.frameDelay = 6;
	bigRing.tile = "O";
	bigRing.addAnis( {
		spin: {row:0, frames: 8},
	});
	bigRing.scale = 2

	player.overlaps(rings,collect)
	player.overlaps(bigRing,big)

	walls = new Group();
	walls.w = 48;
	walls.h = 32;
	walls.tile = "-";
	walls.collider = 'static';
	walls.image = "block.png"

	ground = new Group();
	ground.w = 64;
	ground.h = 33;
	ground.tile = "=";
	ground.collider = 'static';
	ground.image = "grass.png";

	block = new Group();
	block.w = 48;
	block.h = 32;
	block.tile = "_";
	block.collider = 'static';
	block.image = "block.png";

	goal = new Group();
	goal.w = 40;
	goal.h = 60;
	goal.tile = "G"
	goal.collider = 'none';

	player.overlaps(goal,finish)
	
	tileMap = new Tiles(
		['_____________________________________________________________...........................................................',
		 '_____________________________________________________________...........................................................',	
		 '_____________________________________________________________...........................................................',
		 '_____________________________________________________________...........................................................',
		 '-.......................................__________________..............................................................',
		 '-......................................._________________...............................................................',
		 '-...........................................................=.............................................................',
		 '-..........................................................._.............................................................',
		 '-......................................=====================_............................................................',
		 '-......................................-..................._..............................................................',
		 '-......................................-..................._.............................................................',
		 '-...................................o..-..................._.............................................................',
		 '-...................................=..-..................._.............................................................',
		 '-..............................o.......-..................._.............................................................',
		 '-..............................=.......-..................._.............................................................',
		 '-.O.................................o..-..................._.............................................................',
		 '-..........o......o.................=..-..................._.............................................................',
		 '-===.......=......=.......o............-..................._.............................................................',
		 '-.........................=.....o......-..................._.............................................................',
		 '-...............................=...oo.-..................._.............................................................',
		 '-...................................==.-..................._.............................................................',
		 '-......................................-..................._.............................................................',
		 '-..................................oo..-..................._.............................................................',
		 '-..................................==..-..................._.............................................................',
		 '-......................................-',
		 '-.........................ooo..........-',
		 '-.........................===....oo....-',
		 '-......................................-',
		 '-................................==....-',
		 '-.....................................G-',
		 '========================================',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		 '________________________________________',
		],
		64,
		33,
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
		player.vel.x -= 0.2;
		player.mirror.x = true 
	}
	else if(kb.pressing('d')){
		//player.changeAni('run')
		player.vel.x += 0.2;
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

function big(player,item){
	score +=10;
	item.remove()
}

function enemysetup(){
	enemy = new Group();
	enemy.rotationLock = true;

	enemy.w = 50;
	enemy.h = 50;
	enemy.spriteSheet = motobug;
	enemy.anis.frameDelay = 6;
	enemy.addAnis({
	  walk:{row:0, frames:11},
	  turn:{row:1, frames:5},
	})
	enemy.scale = 0.64;
	enemy.width = 20;
	enemy.height = 30;
	enemy.anis.offset.y = -11.5;
	enemy.bounciness = 0;
	enemy.friction = 5;
	enemy.health = 100;
	enemy.debug = true;
	enemy.anis.offset.y = 0
  }

  function finish(){

  }