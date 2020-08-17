class Chest extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y, frame)
	{
		super(scene, x, y, frame);
		this.setOrigin(0, 0);
	}
}

class Monster
	{
		constructor(x, y, scene, texture)
		{
			this.body = scene.physics.add.sprite(x,y, texture);
			this.body.setVelocity(0, 0);
			this.body.setOrigin(0, 0);
			this.body.setCollideWorldBounds(true); 
			this.body.anims.play(texture+'-idle', true);
			this.healthbar = new HealthBar(scene, this);
			this.health = 100;
			this.status = 1;
			this.direction = 0;
			this.stateMachine = new StateMachine('idle', {idle: new MonsterIdleState(), chasing: new MonsterChasingState(), running: new MonsterRunState(), dead: new MonsterDeadState()}, [scene, this]); 
			
		}
		minusHealth()
		{
			this.health -= 10;
		}
		hideHealthbar(check)
		{
			if(check)
			{
				this.healthbar.background.setVisible(false);
				this.healthbar.gauge.setVisible(false);
			}
			else
			{
				this.healthbar.background.setVisible(true);
				this.healthbar.gauge.setVisible(true);
			}
		}
	}
	/*
	class Player
	{
		constructor(x, y, scene)
		{
			this.HITBOX = scene.physics.add.sprite(x, y, null);
			this.body = scene.physics.add.sprite(x, y, 'mainCharacter', 0);
			this.body.activeChest = null;
			this.HITBOX.setOrigin(0, 0);
			this.HITBOX.setVisible(false);
			this.body.setOrigin(0, 0);
			this.health = 333;
			this.stateMachine = new StateMachine('idle', {idle: new IdleState(), move: new MoveState(), swing: new SwingState()}, [scene, this]); 
		}
	}*/

    class PlayingScene extends Phaser.Scene
    {
        constructor()
        {
            super("playingScene");
        }
        preload ()
        {
            loadImages(this);
        }
        create ()
        {
            this.once = null;
            createUI(this);
            loadAnimation(this);
            loadMap(this);
            loadObjects(this);
            this.physics.add.collider(this.worldLayer, this.player.body, function(){console.log('collide with wall')});
            this.physics.add.collider(this.chests, this.player.body, function(obj1, obj2){
                console.log('collide with chest', obj2);
                console.log(obj1.scene.once);
				if(obj1.activeChest == null)
				{
					obj1.keyboardAlarm = obj1.scene.physics.add.sprite(obj1.x+(obj1.width-52)/2, obj1.y+obj1.height, 'space-key');
					obj1.keyboardAlarm.setOrigin(0,0);
					obj1.keyboardAlarm.body.position.set(obj1.keyboardAlarm.x, obj1.keyboardAlarm.y);
					obj1.keyboardAlarm.anims.play('space-pressed');
					obj1.activeChest = obj2;
				}
            });
            this.keys = this.input.keyboard.addKeys('A, D, W, S, SPACE');
            this.cameras.main.setSize(1320, 700);
            this.cameras.main.startFollow(this.player.body, true);
        }
        update()
        {
            this.player.stateMachine.step();
            for(var i = 0; i<this.monsterlist.length; i++)
            {
                this.monsterlist[i].stateMachine.step();
            }
        }
    }