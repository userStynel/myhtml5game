function loadMonsterIMG(scene)
{
	scene.load.spritesheet('tank', './assets/MONSTER/tank.png',{frameWidth: 64, frameHeight: 64});
	scene.load.spritesheet('tank-deadmotion', './assets/MONSTER/tank-deadmotion.png',{frameWidth: 64, frameHeight: 64});
	scene.load.spritesheet('cubeSlime', './assets/MONSTER/cubeSlime.png',{frameWidth: 64, frameHeight: 50});
	scene.load.spritesheet('cubeSlime-deadmotion', './assets/MONSTER/cubeSlime-deadmotion.png', {frameWidth: 64, frameHeight: 50});
	scene.load.spritesheet('greenMonster','./assets/MONSTER/greenMonster.png', {frameWidth: 64, frameHeight: 64});
	scene.load.spritesheet('greenMonster-deadmotion','./assets/MONSTER/greenMonster-deadmotion.png', {frameWidth: 64, frameHeight: 64});
}

function loadNPCImg(scene)
{
	scene.load.spritesheet('rabbit', './assets/NPC/rabbit.png',  { frameWidth: 128, frameHeight: 128});
	scene.load.spritesheet('vendor', './assets/NPC/VENDOR.png', {frameWidth: 64, frameHeight: 64});
}

function loadUIImg(scene)
{
	scene.load.image('heart', './assets/UI/hb.png');
	scene.load.image('monsterhealthbar', './assets/UI/MonsterHealthBar.png');
	//scene.load.spritesheet('hiteffect', './assets/hitmotion.png', {frameWidth: 86, frameHeight: 20});
}

function loadMapIMG(scene)
{
	scene.load.image('tiles', './assets/tile/tileset.png');
    scene.load.tilemapCSV('map', './assets/tile/map.csv');
}

function loadImages(scene)
{
	loadMonsterIMG(scene);
	loadNPCImg(scene);
	loadUIImg(scene);
	loadMapIMG(scene);
    scene.load.spritesheet('mainCharacter', './assets/mainCharacter.png', { frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('mainCharacter-attackmotion', './assets/mainCharacter-attackmotion.png', {frameWidth: 64, frameHeight: 64});
}

function loadAnimation(scene)
{
	// 애니메이션을 로드합니다
	scene.anims.create({
        key: 'idle-down',
        frames: scene.anims.generateFrameNumbers('mainCharacter', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'idle-up',
        frames: scene.anims.generateFrameNumbers('mainCharacter', { start: 11, end: 12}),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'idle-right',
        frames: scene.anims.generateFrameNumbers('mainCharacter', { start: 17, end: 18}),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'idle-left',
        frames: scene.anims.generateFrameNumbers('mainCharacter', { start: 19, end: 20}),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-down',
        frames: scene.anims.generateFrameNumbers('mainCharacter', { start: 2, end: 6 }),
        frameRate: 10,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-up',
        frames: scene.anims.generateFrameNumbers('mainCharacter', { start: 7, end: 11 }),
        frameRate: 10,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-right',
        frames: scene.anims.generateFrameNumbers('mainCharacter', { start: 13, end: 14 }),
        frameRate: 10,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-left',
        frames: scene.anims.generateFrameNumbers('mainCharacter', { start: 15, end: 16 }),
        frameRate: 10,
        repeat: -1
        });
	scene.anims.create({
        key: 'attack_up',
        frames: scene.anims.generateFrameNumbers('mainCharacter-attackmotion', { start: 5, end: 9}),
        frameRate: 11,
        repeat: 0
        });
	scene.anims.create({
        key: 'attack_down',
        frames: scene.anims.generateFrameNumbers('mainCharacter-attackmotion', { start: 0, end: 4 }),
        frameRate: 11,
        repeat: 0
        });
    scene.anims.create({
        key: 'attack_left',
        frames: scene.anims.generateFrameNumbers('mainCharacter-attackmotion', { start: 13, end: 15 }),
        frameRate: 11,
        repeat: 0
        });
    scene.anims.create({
        key: 'attack_right',
        frames: scene.anims.generateFrameNumbers('mainCharacter-attackmotion', { start: 10, end: 12 }),
        frameRate: 11,
        repeat: 0
        });
    scene.anims.create({
        key: 'idle2_left',
        frames: scene.anims.generateFrameNumbers('vendor', { start: 0, end: 1 }),
        frameRate: 5,
        repeat: -1
        });
    scene.anims.create({
        key: 'rabbit_idle',
        frames: scene.anims.generateFrameNumbers('rabbit', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: -1
        });
	 scene.anims.create({
        key: 'greenMonster-idle',
        frames: scene.anims.generateFrameNumbers('greenMonster', { start: 0, end:2}),
        frameRate: 5,
        repeat: -1
        });
	 scene.anims.create({
        key: 'test',
        frames: scene.anims.generateFrameNumbers('testchar', { start: 0, end:1}),
        frameRate: 3,
        repeat: -1
        });
	 scene.anims.create({
        key: 'cubeSlime-idle',
        frames: scene.anims.generateFrameNumbers('cubeSlime', { start: 0, end:2}),
        frameRate: 3,
        repeat: -1
        });
	scene.anims.create({
        key: 'cubeSlime-dead',
        frames: scene.anims.generateFrameNumbers('cubeSlime-deadmotion', { start: 0, end:4}),
        frameRate: 5,
        repeat: 0
        });
	
	scene.anims.create({
        key: 'greenMonster-dead',
        frames: scene.anims.generateFrameNumbers('greenMonster-deadmotion', { start: 0, end:4}),
        frameRate: 5,
        repeat: 0
        });
	 scene.anims.create({
        key: 'tank-idle',
        frames: scene.anims.generateFrameNumbers('tank', { start: 0, end:1}),
        frameRate: 7,
        repeat: -1
        });
		 scene.anims.create({
        key: 'tank-dead',
        frames: scene.anims.generateFrameNumbers('tank-deadmotion', { start: 0, end:4}),
        frameRate: 5,
        repeat: 0
        });
}

function loadMap(scene)
{
	scene.map = scene.make.tilemap({key: 'map', tileWidth:64, tileHeight:64});
	scene.tileImages = scene.map.addTilesetImage("tiles");
	scene.map.createStaticLayer(0, scene.tileImages, 0, 80);
}

function loadNPC(NPClist, scene)
{
	NPClist.push(scene.physics.add.sprite(600, 600, 'rabbit'));
	NPClist.push(scene.physics.add.sprite(300, 600, 'vendor'));
	
	NPClist[1].setInteractive();
    NPClist[1].on('pointerdown', function(){dialogue("vendor")});
	NPClist[1].anims.play('idle2_left', true);
	
    NPClist[0].setInteractive();
    NPClist[0].on('pointerdown', function(){dialogue("rabbit")});
	NPClist[0].anims.play('rabbit_idle', true);
}

function loadMonster(Monlist, scene)
{
	var texture;
	for(var i = 0; i<13; i++)
	{
		if(i%3==0)
			texture = 'greenMonster';
		else if(i%3 == 1)
			texture = 'cubeSlime';
		else
			texture = 'tank';
		Monlist.push(new Monster(70*(i+3), 70*(i+3), scene, texture));
		scene.physics.add.collider(scene.player.body, Monlist[i].body, function()
								   {
									if(scene.health <=0)
									{alert("Legend is never die");} 
									else
									{
										if(scene.health>=30)
										{scene.health -= 2;}
										else
										{scene.health = 0;}
										scene.headerUI.heartBar.fillRect(0, 0, scene.health-333, 48);
									}
								   });
		scene.actingQueue.push(Monlist[i]);
	}
}

function dialogue(name)
{
    var rand = Math.floor(Math.random()*2);
    if(name == "vendor")
        alert("Hi! I'm Vender, Do you interested in my stuff?");
    else if(name == "rabbit")
    {
        if(rand == 0)
            alert("Hi I'm taking Giant Rabbit from weird world!");
        else if(rand == 1)
            alert("I love you so Much!");
    }
	else if(name == "ninja")
		alert("Hi! I'm NINJA!");
}

function loadPlayer(scene)
{
	scene.player = new Player(128, 256+80, scene);
	scene.player.direction = "down";
	scene.player.body.setCollideWorldBounds(true); 
	scene.player.body.anims.play('idle-'+scene.player.direction, true); 
	scene.actingQueue.push(scene.player);
}

function loadObjects(scene)
{
	loadPlayer(scene);
	scene.monsterlist = new Array();
	loadMonster(scene.monsterlist, scene);
	scene.NPClist = new Array();
	loadNPC(scene.NPClist, scene);
}
