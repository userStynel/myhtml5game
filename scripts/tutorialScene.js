var isBtnPressed = false;
var dialogScript = '여기가 어디냐고? 나도 잘 몰라!\n일단 묻지말고 포탄을 피해 우측 상단으로가서 버튼을 눌러봐! 그럼 내가 있는 문이 열릴거야\nGod Bless you!\n';
var healthTellerScript;

class Player
{
	constructor(scene, x, y, texture)
	{
		this.object = scene.physics.add.sprite(x, y, texture);
		this.object.setOrigin(0, 0);
		this.object.speed = 75;
		this.object.health = 100;
		this.object.isInvicible = false;
		this.object.setInvicible = function(object){
			const obj = object;
			object.isInvicible = true;
			setTimeout(function(){
				obj.isInvicible=false;
				obj.setTint(0xffffff);
				console.log("unset Invicible");
			}, 500);}
	}
}

class CannonBall extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y, frame)
	{
		super(scene, x, y, frame);
		this.speed = 50;
		this.lock = false;
	}
	flying()
	{
		this.setVelocityY(this.speed);
		this.anims.play('cannonBall-fly');
	}
	explode()
	{
		if(!this.lock)
		{
			this.lock = true;
			this.setVelocity(0, 0);
			this.anims.play('cannonBall-explode');
			this.once('animationcomplete', () => {this.destroy()});
		}
	}
}

function touchButton(scene)
{
	var playerLeft = scene.player.object.x;
	var playerRight = scene.player.object.x+scene.player.object.width;
	var playerTop = scene.player.object.y;
	var playerBottom = scene.player.object.y+scene.player.object.height;
	
	var buttonLeft = 576;
	var buttonRight = 576+64;
	var buttonTop = 192+80;
	var buttonBottom = 256+80;
	
	if(playerRight >= buttonLeft && playerLeft <= buttonRight && playerBottom >= buttonTop && playerTop <= buttonBottom)
		return true;
	return false;
}

function shooting(scene)
{
	var sceneSave = scene;
	var cannonballSave;
	if(!isBtnPressed)
	{
		setTimeout(function(){
			var isPicked = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
			var numCannon = Math.floor(Math.random()*7)+1;
			console.log('numCannon', numCannon);
			for(var i = 0; i<numCannon; i++)
			{
				var pick;
				pick = Math.floor(Math.random()*9); 
				console.log(pick);
				isPicked[pick] = 1;
				cannonballSave = sceneSave.cannonBall.get(64*(pick+1)+32, 128+32+80, 'cannonBall-fly'); 
				cannonballSave.flying();
			}
			shooting(sceneSave);  
		}, 700);
	}
}

class tutorialScene extends Phaser.Scene
{
	constructor()
	{
		super("tutorialScene");
	}
	preload()
	{
		this.load.image('tiles', './assets/tile/tileset.png');
		this.load.image('tutorialCharacter', './assets/UI/tutorial_character.png');
		this.load.tilemapCSV('tutorialMap', './assets/tile/tutorialMap.csv');
		this.load.spritesheet('wasdInfo', './assets/UI/WASD_INFO.png', {frameWidth:96, frameHeight:54});
		this.load.spritesheet('spaceInfo', './assets/UI/SPACE_INFO.png', {frameWidth:132, frameHeight:24});
		this.load.spritesheet('mainCharacter', './assets/mainCharacter.png', { frameWidth: 64, frameHeight: 64});
    	this.load.spritesheet('mainCharacter-attackmotion', './assets/mainCharacter-attackmotion.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('cannonBall-fly', './assets/cannonBall-fly.png', { frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('cannonBall-explode', './assets/cannonBall-explode.png', { frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('button', './assets/button.png', { frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('brick', './assets/brick.png', { frameWidth: 64, frameHeight: 64});
	}
	create()
	{
		this.keys = this.input.keyboard.addKeys('A, D, W, S, SPACE');
		this.cannonBall = this.physics.add.group({classType:CannonBall});
		
		this.anims.create({
        key: 'cannonBall-fly', // 캐논볼이 날아가는 애니메이션
        frames: this.anims.generateFrameNumbers('cannonBall-fly', { start: 0, end: 1}),
        frameRate: 3,
        repeat: -1
        });
		this.anims.create({
        key: 'cannonBall-explode', // 캐논볼이 터지는 애니메이션
        frames: this.anims.generateFrameNumbers('cannonBall-explode', { start: 0, end: 2}),
        frameRate: 11,
        repeat: 0
        });
		this.anims.create({
        key: 'wasdInfo-anime', // 캐릭터 아래에 w,a,s,d 키가 이동임을 알려주는 애니메이션
        frames: this.anims.generateFrameNumbers('wasdInfo', { start: 0, end: 4}),
        frameRate: 5,
        repeat: -1
        });
		this.anims.create({
        key: 'spaceInfo-anime', // 캐릭터 아래에 스페이스키가 상호작용임을 알려주는 애니메이션
        frames: this.anims.generateFrameNumbers('spaceInfo', { start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
        });
		this.anims.create({
        key: 'button-pushing', // 버튼이 눌리는 애니메이션
        frames: this.anims.generateFrameNumbers('button', { start: 0, end: 4}),
        frameRate: 3,
        repeat: 0
        });
		this.anims.create({
        key: 'brick-demolishing', // 벽이 부숴지는 애니메이션
        frames: this.anims.generateFrameNumbers('brick', { start: 0, end: 1}),
        frameRate: 3,
        repeat: 0
        });
		
		shooting(this);
		
		this.map = this.make.tilemap({key:'tutorialMap', tileWidth:64, tileHeight:64});
		const tiles = this.map.addTilesetImage('tiles');
		const layer = this.map.createStaticLayer(0, tiles, 0, 80);
		
		const header = this.add.graphics({x:0, y:0});
		header.fillStyle('0x383E56', 1);
		header.fillRect(0, 0, 1320, 80);
		header.setDepth(5);
		header.setScrollFactor(0, 0);
		layer.setCollision([0, 1, 4, 7, 11]);
		
		this.player = new Player(this, 64*1, 64*14+80, 'mainCharacter');
		
		const tutorialChar = this.add.image(5, 5, 'tutorialCharacter');
		tutorialChar.setOrigin(0, 0);
		tutorialChar.setScrollFactor(0, 0);
		tutorialChar.setDepth(6);
		
		healthTellerScript = '[ -- 현재 너의 체력: ' + this.player.object.health.toString() + '-- ]';
		this.text = this.add.text(105, 5, dialogScript + healthTellerScript);
		this.text.setDepth(7);
		this.text.setScrollFactor(0, 0);
		
		this.physics.add.collider(this.player.object, layer);
		this.physics.add.collider(this.player.object, this.cannonBall, function(obj1, obj2){
			obj2.explode();
			if(!obj1.isInvicible)
			{
				obj1.health -= 5;
				obj1.setInvicible(obj1);
				obj1.setTint(0xff0000);
				obj1.setY(obj1.y+25);
				healthTellerScript = '[ -- 현재 너의 체력: ' + obj1.health.toString() + '-- ]';
				console.log("Ouch! - set Invicible", obj1.health);
				obj1.scene.text.setText(dialogScript + healthTellerScript);
			}
		});
		this.physics.add.collider(layer, this.cannonBall, function(obj1, obj2){
			obj1.explode();
		});
		
		this.alarm = this.add.sprite(0, 0, 'wasdInfo');
		this.alarm.anims.play(this.alarm.texture.key+'-anime');
		
		this.cameras.main.setSize(892, 892);
        this.cameras.main.startFollow(this.player.object, true);
		
		this.button = this.add.sprite(576, 192+80, 'button');
		this.button.setOrigin(0, 0);
		
		this.brick = this.physics.add.sprite(64*10, 64*4+80, 'brick');
		this.brick.setOrigin(0, 0);
		this.brickCollider = this.physics.add.collider(this.brick, this.player.object, function(obj1, obj2){obj1.setVelocity(0, 0);});
	}
	update()
	{
		this.player.object.setVelocity(0, 0);
		if(this.keys.W.isDown)
			this.player.object.setVelocityY(-this.player.object.speed);
		if(this.keys.S.isDown)
			this.player.object.setVelocityY(this.player.object.speed);
		if(this.keys.A.isDown)
			this.player.object.setVelocityX(-this.player.object.speed);
		if(this.keys.D.isDown)
			this.player.object.setVelocityX(this.player.object.speed);
		if(!isBtnPressed)
			this.alarm.setPosition(this.player.object.x+32, this.player.object.y+74+this.alarm.height/2);
		if(!isBtnPressed && touchButton(this))
		{
			if(this.alarm.texture.key != 'spaceInfo')
			{
				this.alarm.setTexture('spaceInfo');
				this.alarm.anims.play(this.alarm.texture.key+'-anime');
			}
			if(this.keys.SPACE.isDown)
			{
				var scene = this;
				var cbNode = this.cannonBall.children.entries;
				this.alarm.destroy();
				isBtnPressed = true;
				this.button.anims.play('button-pushing');
				this.button.on('animationcomplete', function(){
					console.log(cbNode);
					for(var i=0; i<cbNode.length; i++)
					{
						cbNode[i].explode();
					}
					scene.brick.anims.play('brick-demolishing');
					scene.brickCollider.destroy();
					scene.text.setText("아주 잘했어! 오른쪽으로 가봐!\n[ -- 아직 미완성 -- ]");});
			}
		}
		else if(!isBtnPressed)
		{
			if(this.alarm.texture.key != 'wasdInfo')
			{
				this.alarm.setTexture('wasdInfo');
				this.alarm.anims.play(this.alarm.texture.key+'-anime');
			}
		}
	}
}