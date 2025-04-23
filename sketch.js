let player;
let bigRing;
let walls;
let img, ringImg, backGroundImg;
let rings = 0;
let spring;
let backGround;
let score = 0;
let level = 1;
let win;
let winMessage = false; // Flag to track if the player has won

function preload () {
	img = loadImage('sonic mania sonic.png')
	ringImg = loadImage('Rings.png')
	backGround = loadImage('cave.png')
	bigRingImg = loadImage('big ring mania.png')
	motobug = loadImage('motobug.png')
	goalImg = loadImage('goal.png')
	rockImg = loadImage('rock block.png')
	rockGrassImg = loadImage('rock grass.png')
	marbleImg = loadImage('marble.png')
	boulderImg = loadImage('boulder.png')
	spikeImg = loadImage('spikes.png')
	outsideImg = loadImage('outside.png')
}

function setup() {
	createCanvas(windowWidth, windowHeight);

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


	goal = new Group();
	goal.w = 45;
	goal.h = 50;
	goal.spriteSheet = goalImg
	goal.anis.frameDelay = 5;
	goal.tile = "G"
	goal.collider = 'dynamic';
	goal.addAnis({
		still: {row:0, frames:1},
		spin: {row:1, frames: 13}
	});


	walls = new Group();
	walls.w = 48;
	walls.h = 32;
	walls.tile = "-";
	walls.collider = 'static';
	walls.image = "block.png"

	ground = new Group();
	ground.w = 64;
	ground.h = 32;
	ground.tile = "=";
	ground.collider = 'static';
	ground.image = "grass.png";

	block = new Group();
	block.w = 48;
	block.h = 32;
	block.tile = "_";
	block.collider = 'static';
	block.image = "block.png";

	rockBlock = new Group();
	rockBlock.w = 48;
	rockBlock.h = 32;
	rockBlock.tile = "r";
	rockBlock.collider = 'static';
	rockBlock.image = "rock block.png";

	rockGrass = new Group();
	rockGrass.w = 64;
	rockGrass.h = 32;
	rockGrass.tile = "g";
	rockGrass.collider = 'static';
	rockGrass.image = "rock grass.png";

	marble = new Group();
	marble.w = 48;
	marble.h = 32;
	marble.tile = "m";
	marble.collider = 'static';
	marble.image = "marble.png";

	boulder = new Group();
	boulder.w = 48;
	boulder.h = 32;
	boulder.tile = "b";
	boulder.collider = 'static';
	boulder.image = "boulder.png";

	finish = new Group();
	finish.w = 48;
	finish.h = 50;
	finish.tile = "f";
	finish.collider = 'dynamic';
	finish.spriteSheet = goalImg
	finish.anis.frameDelay = 5;
	finish.addAnis({
		still: {row:0, frames:1},
		spin: {row:1, frames: 13}
	});

	spike = new Group();
	spike.w = 32;
	spike.h = 32;
	spike.tile = "s";
	spike.collider = 'static';
	spike.image = "spikes.png";
	level1 = new Tiles(
		['________________________________________________________________________________________________________',
		 '________________________________________________________________________________________________________',	
		 '________________________________________________________________________________________________________',
		 '________________________________________________________________________________________________________',
		 '-.......................................__________________.............................................-',
		 '-......................................................................................................-',
		 '-...........................................................=..........................................-',
		 '-..........................................................._..........................................-',
		 '-......................................=====================_..........................................-',
		 '-......................................-..................._...........................................-',
		 '-......................................-..................._...........................................-',
		 '-...................................o..-..................._...........................................-',
		 '-...................................=..-..................._...........................................-',
		 '-..............................o.......-..................._...........................................-',
		 '-..............................=.......-..................._...........................................-',
		 '-.O....................................-..................._...........................................-',
		 '-..........o......o....................-..................._...........................................-',
		 '-===.......=......=.......o............-..................._=================================..=========',
		 '-.........................=............-..................._......................-............-.......-',
		 '-......................................-..................._......................-............-.......-',
		 '-......................................-..................._......................-..........==-.......-',
		 '-..............................oo......-..................._......................-ooo...====-.........-',
		 '-..............................==......-..................._......................-===.................-',
		 '-......................................-..................._.........................-.................-',
		 '-......................................-..................._.........................-.................-',
		 '-.........................ooo..........-..................._.........................-ooo..............-',
		 '-.........................===..........-..................._.........................-===.....ooo......-',
		 '-......................................-..................._..................................===......-',
		 '-......................................-..................._...........................................-',
		 '-......................................-..................._.................========..................-',
		 '========================================..................._........................-..................-',
		 '________________________________________..................._........................-..................-',
		 '________________________________________..................._........................-==================-',
		 '________________________________________..................._...........................................-',
		 '________________________________________..................._...........................................-',
		 '________________________________________..................._...........ooo.............................-',
		 '________________________________________..................._...........===.............................-',
		 '________________________________________..................._...........................................-',
		 '________________________________________..................._...........................................-',
		 '________________________________________..................._.....................................G.....-',
		 '________________________________________..................._============================================',
		 '________________________________________..................._--------------------------------------------',
		 '________________________________________..................._--------------------------------------------',
		 '________________________________________..................._--------------------------------------------',
		 '________________________________________..................._--------------------------------------------',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r......................................................................................................r',
		 'r.......................................................................oooo...........................r',
		 'r.......................................................................gggg...........................r',
		 'r..............................................o...................o....mmmm...........................r',
		 'r..............................................b.............o.....b....mmmm...........................r',
		 'r........................................o.....r......o......b.....r....mmmm...........................r',
		 'r........................................b.....r......b......r.....r....mmmm...........................r',
		 'r................................o.......r............r......r..........mmmm...........................r',
		 'r................................b.......r............r.................mmmm...........................r',
		 'r.....................ooo........r......................................mmmm...........................r',
		 'r.................o...ggg........r......................................mmmm...........................r',
		 'r.................b.....................................................mmmm...........................r',
		 'r.................m.....................................................mmmm...........................r',
		 'r.................msssssssssssssssssssssssssssssssssssssssssssssssssssssmmmm...............f...........r',
		 'rgggggggggggggggggmgggggggggggggggggggggggggggggggggggggggggggggggggggggmmmmgggggggggggggggggggggg...ggr',
		 'rmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm...mmr',
		 'rmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.....mmmmg..mmr',
		 'rmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm..O.........mmr',
		 'rmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm............mmr',
		 'rmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm............mmr',
		 'rmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmggggggggggggmmr',
		 'rmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmr',
		 'rmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmr',
		 'rmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmr',

		],
		64,
		32,
		walls.w,
		walls.h

	);
	


   

}

function draw() {
	camera.zoom = 1.5;
	camera.x = player.x;
	camera.y = player.y;
	background('purple');

	
	controls()
	fill(255, 255, 0)
	textSize(30)

	image(outsideImg, 0, 0, width, height);
	text("Rings: " + score,100,100)
	text("Level: " + level,100,150)


	if (winMessage) {
        // Display "You Win" in the middle of the screen
        textSize(50);
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        text("You Win!", width / 2, height / 2);
    }

	resetLevel();
	finishLevel();
	finishGame();


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
	if(kb.pressing('space') && player.colliding(rockGrass))
		{
			//player.changeAni(['jump','stand'])
			player.vel.y = -10;
		}
	if(kb.pressing('space') && player.colliding(boulder))
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

	if(player.vel.x < 0 || player.vel.x > 0){
		player.changeAni('run')
	}
	else if(floor(player.vel.y) < -2){
		player.changeAni('jump')
	}else if(player.vel.y >-1 && player.vel.y <1 ){
		player.changeAni('stand')
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


function finishLevel(){
	if (player.overlaps(goal)){
		level +=1;
		player.x = 200;
		player.y = 2300;
		score = 0;
	}
}

function finishGame() {
    if (player.overlaps(finish)) {

        winMessage = true; // Set the win message flag to true
    }
}

function resetLevel() {
    if (player.overlaps(spike)) {
        // Reset the player's position and score
        player.x = 200; // Starting x position
        player.y = 2300; // Starting y position
        score = 0; // Reset score
    }
}