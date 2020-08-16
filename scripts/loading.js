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
	scene.load.image('heart-poison', './assets/UI/hb-poison.png');
    scene.load.image('dialogBox', './assets/UI/dialogueBox.png');
    scene.load.spritesheet('space-key', './assets/UI/keyboard/SPACE-Key.png',{frameWidth: 52, frameHeight: 16});
}

function loadMapIMG(scene)
{
    scene.load.image('tiles', './assets/tile/tileset.png');
    scene.load.spritesheet('chest', './assets/chest.png', {frameWidth: 64, frameHeight: 72});
    scene.load.spritesheet('coin', './assets/Coin.png', {frameWidth: 64, frameHeight: 64});
	scene.load.tilemapTiledJSON('map', './assets/tile/map.json');
}

function loadImages(scene)
{
	loadMonsterIMG(scene);
	loadNPCImg(scene);
	loadUIImg(scene);
	loadMapIMG(scene);
    scene.load.spritesheet('mainCharacter', './assets/mainCharacter.png', { frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('mainCharacter-attackmotion', './assets/mainCharacter-attackmotion.png', {frameWidth: 64, frameHeight: 64});
	scene.load.spritesheet('mainCharacter-poison', './assets/mainCharacter-poison.png', {frameWidth: 64, frameHeight: 64});
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
        key: 'idle-down-poison',
        frames: scene.anims.generateFrameNumbers('mainCharacter-poison', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'idle-up-poison',
        frames: scene.anims.generateFrameNumbers('mainCharacter-poison', { start: 11, end: 12}),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'idle-right-poison',
        frames: scene.anims.generateFrameNumbers('mainCharacter-poison', { start: 17, end: 18}),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'idle-left-poison',
        frames: scene.anims.generateFrameNumbers('mainCharacter-poison', { start: 19, end: 20}),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-down-poison',
        frames: scene.anims.generateFrameNumbers('mainCharacter-poison', { start: 2, end: 6 }),
        frameRate: 10,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-up-poison',
        frames: scene.anims.generateFrameNumbers('mainCharacter-poison', { start: 7, end: 11 }),
        frameRate: 10,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-right-poison',
        frames: scene.anims.generateFrameNumbers('mainCharacter-poison', { start: 13, end: 14 }),
        frameRate: 10,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-left-poison',
        frames: scene.anims.generateFrameNumbers('mainCharacter-poison', { start: 15, end: 16 }),
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
    scene.anims.create({
         key: 'chest-open',
        frames: scene.anims.generateFrameNumbers('chest', { start: 0, end:2}),
        frameRate: 5,
        repeat: 0
        });
    scene.anims.create({
        key: 'space-pressed',
        frames: scene.anims.generateFrameNumbers('space-key', { start: 0, end:1}),
        frameRate: 5,
        repeat: -1
        });
    scene.anims.create({
        key: 'coin-spinning',
        frames: scene.anims.generateFrameNumbers('coin', { start: 0, end:2}),
        frameRate: 5,
        repeat: -1
        });
    
}

function loadMap(scene)
{
	scene.map = scene.make.tilemap({key: 'map'});
	scene.tileImages = scene.map.addTilesetImage("dungeon", "tiles");
	scene.worldLayer = scene.map.createStaticLayer('IAM', scene.tileImages, 0, 80);
    scene.worldLayer.setCollision([1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    scene.chests = scene.physics.add.staticGroup();
    const kimoddi = scene.map.getObjectLayer('Chests');
    for(var i = 0; i<kimoddi.objects.length; i++)
    {
        scene.chests.get(kimoddi.objects[i].x, kimoddi.objects[i].y, 'chest');
        scene.chests.children.entries[i].body.position.set(kimoddi.objects[i].x, kimoddi.objects[i].y);
        scene.chests.children.entries[i].setOrigin(0, 0);
    }
    console.log(scene.chests);
    
	scene.anomalyTile = [];
	for(var i = 0; i<scene.worldLayer.layer.data.length; i++)
	{
		for(var j=0; j<scene.worldLayer.layer.data[i].length; j++)
		{
			if(scene.worldLayer.layer.data[i][j].index == 16 || (scene.worldLayer.layer.data[i][j].index >= 17 && scene.worldLayer.layer.data[i][j].index <= 20))
				scene.anomalyTile.push(scene.worldLayer.layer.data[i][j]);
		}
	}
}

function loadNPC(NPClist, scene)
{
	NPClist.push(scene.physics.add.sprite(600, 600, 'rabbit'));
	NPClist.push(scene.physics.add.sprite(300, 600, 'vendor'));
	
	NPClist[1].setInteractive();
    NPClist[1].on('pointerdown', function(){dialogue(NPClist[1], scene)});
	NPClist[1].anims.play('idle2_left', true);
	
    NPClist[0].setInteractive();
    NPClist[0].on('pointerdown', function(){dialogue(NPClist[0], scene)});
	NPClist[0].anims.play('rabbit_idle', true);
}

function loadMonster(Monlist, scene)
{
	var texture;
	for(var i = 0; i<9; i++)
	{
		if(i%3==0)
			texture = 'greenMonster';
		else if(i%3 == 1)
			texture = 'cubeSlime';
		else
			texture = 'tank';
		Monlist.push(new Monster(70*(i+4), 70*(i+4), scene, texture));
		scene.physics.add.collider(scene.worldLayer, Monlist[i].body);
		scene.physics.add.collider(scene.player.body, Monlist[i].body, function(object1, object2)
								   {
									object1.body.setVelocity(0);
									object2.body.setVelocity(0);
									if(scene.player.health <=0)
									{alert("Legend is never die");} 
									else
									{
										if(scene.player.health>=30)
										{scene.player.health -= 2;}
										else
										{scene.player.health = 0;}
										scene.headerUI.heartBar.fillRect(0, 0, scene.player.health-333, 48);
									}
								   });
	}
}

function dialogue(obj, scene)
{
	if(obj.dialogueBox == undefined)
	{
		var t;
		if(obj.texture.key == 'rabbit')
			t = 'Hello Weird World!';
		else
		{
			if(scene.player.body.poison == true)
				t = 'You need DETOX';
			else
				t = 'I wanna help you';
		}
		obj.dialogueBox =  scene.add.sprite(obj.body.x+obj.body.width/2, obj.body.y+obj.body.height/2, 'dialogBox');
		obj.dialogueBox.setOrigin(0, 0);
		obj.txt = scene.add.text(obj.dialogueBox.x+30, obj.dialogueBox.y+50, t);
	}
	else
	{
		obj.dialogueBox.destroy();
		obj.txt.destroy();
		delete obj.dialogueBox;
		delete obj.txt;
	}
}

function loadPlayer(scene)
{
	scene.player = new Player(128, 256+80, scene);
	scene.player.direction = "down";
	scene.player.body.setCollideWorldBounds(true); 
}

function loadObjects(scene)
{
	loadPlayer(scene);
	scene.monsterlist = new Array();
	loadMonster(scene.monsterlist, scene);
	scene.NPClist = new Array();
    loadNPC(scene.NPClist, scene);
    var sex = scene.add.sprite(256, 208, 'coin');
    sex.setOrigin(0, 0);
    sex.anims.play('coin-spinning');
}
