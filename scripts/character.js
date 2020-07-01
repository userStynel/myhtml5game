function LoadImages(scene)
{
	scene.load.spritesheet('rabbit', './assets/rabbit.png',  { frameWidth: 128, frameHeight: 128});
    scene.load.spritesheet('idle_pic', './assets/as.png', { frameWidth: 128, frameHeight: 128});
    scene.load.spritesheet('attacking_pic', './assets/as_attacking.png', {frameWidth: 128, frameHeight: 128});
    scene.load.spritesheet('character2', './assets/character2.png', {frameWidth: 128, frameHeight: 128});
    scene.load.image('shuriken', './assets/shuriken.png');
    scene.load.image('greenmonster','./assets/MONSTER/green_monster.png');
    scene.load.image('redmonster', './assets/MONSTER/red_monster.png');
    scene.load.image('tiles', './assets/tile/stone_tile.png');
    scene.load.tilemapTiledJSON('map', './assets/tile/map.json');
}

function LoadAnimation(scene)
{
	 scene.anims.create({
        key: 'idle_left',
        frames: scene.anims.generateFrameNumbers('idle_pic', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
        });
    scene.anims.create({
        key: 'idle_right',
        frames: scene.anims.generateFrameNumbers('idle_pic', { start: 5, end: 9}),
        frameRate: 10,
        repeat: -1
        });
    scene.anims.create({
        key: 'attack_left',
        frames: scene.anims.generateFrameNumbers('attacking_pic', { start: 0, end: 1 }),
        frameRate: 5,
        repeat: 0
        });
    scene.anims.create({
        key: 'attack_right',
        frames: scene.anims.generateFrameNumbers('attacking_pic', { start: 2, end: 3 }),
        frameRate: 5,
        repeat: 0
        });
    scene.anims.create({
        key: 'idle2_left',
        frames: scene.anims.generateFrameNumbers('character2', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: -1
        });
    scene.anims.create({
        key: 'rabbit_idle',
        frames: scene.anims.generateFrameNumbers('rabbit', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: -1
        });
}