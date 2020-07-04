function LoadImages(scene)
{
	scene.load.setBaseURL('https://raw.githubusercontent.com/userStynel/myhtml5game/single');
	scene.load.spritesheet('rabbit', './assets/rabbit.png',  { frameWidth: 128, frameHeight: 128});
    scene.load.spritesheet('character_anim', './assets/as.png', { frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('attacking_pic', './assets/as_attacking.png', {frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('character2', './assets/character2.png', {frameWidth: 64, frameHeight: 64});
    scene.load.image('shuriken', './assets/shuriken.png');
    scene.load.image('greenmonster','./assets/MONSTER/green_monster.png');
    scene.load.image('redmonster', './assets/MONSTER/red_monster.png');
    scene.load.image('tiles', './assets/tile/tilesetx2.png');
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


class Monster extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        this.x = x;
        this.y = y;
        super(scene, x, y);
    }
}