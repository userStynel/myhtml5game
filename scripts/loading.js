function loadImages(scene)
{
	// 이미지를 로드합니다
	scene.load.spritesheet('rabbit', './assets/rabbit.png',  { frameWidth: 128, frameHeight: 128});
    scene.load.spritesheet('character_anim', './assets/as.png', { frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('attacking_pic', './assets/as_attacking.png', {frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('vendor', './assets/vendor.png', {frameWidth: 64, frameHeight: 64});
	scene.load.spritesheet('greenmonster','./assets/MONSTER/greenmonster.png', {frameWidth: 64, frameHeight: 64});
	scene.load.spritesheet('testchar', './assets/testcharx2.png', {frameWidth: 64, frameHeight: 106});
	scene.load.image('heart', './assets/hb.png');
	scene.load.image('testchar2', './assets/test.png');
    scene.load.image('shuriken', './assets/shuriken.png');
    scene.load.image('redmonster', './assets/MONSTER/red_monster.png');
    scene.load.image('tiles', './assets/tile/tileset.png');
    scene.load.tilemapCSV('map', './assets/tile/map.csv');
}

function loadAnimation(scene)
{
	// 애니메이션을 로드합니다
	scene.anims.create({
        key: 'idle-down',
        frames: scene.anims.generateFrameNumbers('character_anim', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'idle-up',
        frames: scene.anims.generateFrameNumbers('character_anim', { start: 11, end: 12}),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'idle-right',
        frames: scene.anims.generateFrameNumbers('character_anim', { start: 17, end: 18}),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'idle-left',
        frames: scene.anims.generateFrameNumbers('character_anim', { start: 19, end: 20}),
        frameRate: 3,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-down',
        frames: scene.anims.generateFrameNumbers('character_anim', { start: 2, end: 6 }),
        frameRate: 10,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-up',
        frames: scene.anims.generateFrameNumbers('character_anim', { start: 7, end: 11 }),
        frameRate: 10,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-right',
        frames: scene.anims.generateFrameNumbers('character_anim', { start: 13, end: 14 }),
        frameRate: 10,
        repeat: -1
        });
    scene.anims.create({
        key: 'walking-left',
        frames: scene.anims.generateFrameNumbers('character_anim', { start: 15, end: 16 }),
        frameRate: 10,
        repeat: -1
        });
	scene.anims.create({
        key: 'attack_up',
        frames: scene.anims.generateFrameNumbers('attacking_pic', { start: 5, end: 9}),
        frameRate: 11,
        repeat: 0
        });
	scene.anims.create({
        key: 'attack_down',
        frames: scene.anims.generateFrameNumbers('attacking_pic', { start: 0, end: 4 }),
        frameRate: 11,
        repeat: 0
        });
    scene.anims.create({
        key: 'attack_left',
        frames: scene.anims.generateFrameNumbers('attacking_pic', { start: 15, end: 19 }),
        frameRate: 11,
        repeat: 0
        });
    scene.anims.create({
        key: 'attack_right',
        frames: scene.anims.generateFrameNumbers('attacking_pic', { start: 10, end: 14 }),
        frameRate: 11,
        repeat: 0
        });
    scene.anims.create({
        key: 'idle2_left',
        frames: scene.anims.generateFrameNumbers('vendor', { start: 0, end: 4 }),
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
        key: 'greenmonster-idle',
        frames: scene.anims.generateFrameNumbers('greenmonster', { start: 0, end:2}),
        frameRate: 5,
        repeat: -1
        });
	 scene.anims.create({
        key: 'test',
        frames: scene.anims.generateFrameNumbers('testchar', { start: 0, end:1}),
        frameRate: 3,
        repeat: -1
        });
}

function loadMap(scene)
{
	// 맵을 로드합니다
	scene.map = scene.make.tilemap({key: 'map', tileWidth:64, tileHeight:64});
	scene.tileImages = scene.map.addTilesetImage("tiles");
	scene.map.createStaticLayer(0, scene.tileImages, 0, 80);
}

function loadNPC(NPClist, scene)
{
	// NPC를 로드합니다
	NPClist.push(scene.physics.add.sprite(600,600, 'rabbit'));
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
	for(var i = 0; i<5; i++)
	{
		Monlist.push(new Monster(70*(i+3), 70*(i+3), scene));
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
		Monlist[i].body.setVelocity(0, 0);
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
	scene.player = new Player(128, 256, scene);
	scene.player.direction = "down";
	scene.player.body.setCollideWorldBounds(true); 
	scene.player.body.anims.play('idle-'+scene.player.direction, true); 
	
	
	scene.testplayer2 = scene.physics.add.sprite(100, 600, 'testchar2');
	scene.testplayer2.setInteractive();
	scene.testplayer2.on('pointerdown', function(){dialogue("ninja")});
}

function loadObjects(scene)
{
	loadPlayer(scene);
	scene.monsterlist = new Array();
	loadMonster(scene.monsterlist, scene);
	scene.NPClist = new Array();
	loadNPC(scene.NPClist, scene);
}
