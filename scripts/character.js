function LoadImages(scene)
{
	//scene.load.setBaseURL('https://raw.githubusercontent.com/userStynel/myhtml5game/single');
	scene.load.spritesheet('rabbit', './assets/rabbit.png',  { frameWidth: 128, frameHeight: 128});
    scene.load.spritesheet('character_anim', './assets/as.png', { frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('attacking_pic', './assets/as_attacking.png', {frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('vendor', './assets/vendor.png', {frameWidth: 64, frameHeight: 64});
	scene.load.spritesheet('greenmonster','./assets/MONSTER/greenmonster.png', {frameWidth: 64, frameHeight: 64});
	scene.load.spritesheet('testchar', './assets/testcharx2.png', {frameWidth: 64, frameHeight: 106});
    scene.load.image('shuriken', './assets/shuriken.png');
    scene.load.image('redmonster', './assets/MONSTER/red_monster.png');
    scene.load.image('tiles', './assets/tile/tileset32.png');
    scene.load.tilemapCSV('map', './assets/tile/map.csv');
}

function LoadAnimation(scene)
{
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

function addNPClist(NPClist, scene)
{
	NPClist.push(scene.physics.add.sprite(600,600, 'rabbit'));
	NPClist.push(scene.physics.add.sprite(300, 600, 'vendor'));
	NPClist[1].setInteractive();
    NPClist[1].on('pointerdown', function(){dialogue("vendor")});
    NPClist[0].setInteractive();
    NPClist[0].on('pointerdown', function(){dialogue("rabbit")});
}

function addMonster(Monlist, scene)
{
	for(var i = 0; i<5; i++)
	{
		Monlist.push(new Monster(70*(i+3), 70*(i+3), scene));
		//scene.physics.add.collider(scene.player, Monlist[i].body);
		Monlist[i].body.setVelocity(0, 0);
	}
	
}

function addObjects(scene)
{
	scene.map = scene.make.tilemap({key: 'map', tileWidth:32, tileHeight:32});
	scene.st = scene.map.addTilesetImage("tiles");
	scene.map.createStaticLayer(0, scene.st);
	scene.player = scene.physics.add.sprite(128, 256, 'idle_pic');
	scene.testplayer = scene.physics.add.sprite(150, 600, 'testchar');
	scene.testplayer.anims.play('test');
	scene.monsterlist = new Array();
	addMonster(scene.monsterlist, scene);
	scene.NPClist = new Array();
	addNPClist(scene.NPClist, scene);
    scene.player.direction = "down";
}
