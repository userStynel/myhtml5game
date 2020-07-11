class StateMachine
    {
        constructor(initialState, possibleStates, stateArgs=[])
        {  
            this.initialState = initialState;
            this.possibleStates = possibleStates;
            this.stateArgs = stateArgs;
            this.state = null;
            for(const state of Object.values(this.possibleStates))
            {
                state.stateMachine = this;
            }
        }

        step()
        {
            if(this.state == null)
            {
                this.state = this.initialState;
                this.possibleStates[this.state].enter(this.stateArgs[0], this.stateArgs[1]);
            }
            this.possibleStates[this.state].execute(this.stateArgs[0], this.stateArgs[1]);
        }

        transistion(newState)
        {  
            this.state = newState;
            this.possibleStates[this.state].enter(this.stateArgs[0], this.stateArgs[1]);
        }

    }
    class State
    {
        enter(){}
        execute(){}
    }

    class IdleState extends State
    {
        enter(scene, hero)
        {
            hero.setVelocity(0);
        }
        execute(scene, hero)
        {
            if (scene.keys.A.isDown || scene.keys.D.isDown || scene.keys.W.isDown || scene.keys.S.isDown)
            {
                this.stateMachine.transistion('move');
                return;
            }
            if(scene.keys.SPACE.isDown)
            {
                this.stateMachine.transistion('swing');
                return;
            }
            hero.anims.play('idle-'+hero.direction, true);
        }
    }

    class MoveState extends State
    {
        execute(scene, hero)
        {
            if(scene.keys.SPACE.isDown)
            {
                this.stateMachine.transistion('swing');
                return;
            }
            if(!scene.keys.A.isDown && !scene.keys.D.isDown && !scene.keys.W.isDown && !scene.keys.S.isDown)
            {
                this.stateMachine.transistion('idle');
                return;
            }
            if(scene.keys.A.isDown)
            {
                hero.setVelocityX(-50);
                hero.direction = "left"
            }
            if(scene.keys.D.isDown)
            {
                hero.setVelocityX(50);
                hero.direction = "right"
            }
            if(scene.keys.W.isDown)
            {
                hero.setVelocityY(-50);
                hero.direction = "up";
            }
            if(scene.keys.S.isDown)
            {
                hero.setVelocityY(50);
                hero.direction = "down";
            }
           hero.anims.play('walking-'+hero.direction, true);
        }
    }

    class SwingState extends State
    {
        enter(scene, hero)
        {
			var HitBox;
			var collider;
			var x, y, height, width;
            hero.setVelocityX(0);
			if(hero.direction == 'left')
			{
				height = 64;
				width = 3;
				x = hero.x;
				y = hero.y-((height-hero.height)/2);
			}
			else if(hero.direction == 'right')
			{
				height = 64;
				width = 3;
				x = hero.x+hero.width;
				y = hero.y-((height-hero.height)/2);
			}
			else if(hero.direction == 'up')
			{
				height = 3;
				width = 64;
				x = hero.x-((width-hero.width)/2);
				y = hero.y-height;
			}
			else if(hero.direction == 'down')
			{
				height = 3;
				width = 64;
				x = hero.x-((width-hero.width)/2);
				y = hero.y+hero.height;
			}
			hero.anims.play('attack_'+hero.direction);
			HitBox = scene.physics.add.sprite(x,y, null);
			HitBox.height =height;
			HitBox.width = width;
			for(var i = 0; i<scene.monsterlist.length; i++)
			{
			if(scene.physics.world.collide(HitBox, scene.monsterlist[i].body))
				{
					scene.monsterlist[i].minusHealth();
					alert("Hit Test: Monster " + i + " health: " + scene.monsterlist[i].health);
					if(scene.monsterlist[i].health <= 0)
					{
						if(scene.monsterlist[i].status == 1)
						{
							scene.monsterlist[i].body.anims.stop();
							scene.monsterlist[i].body.setTexture('redmonster');
							scene.monsterlist[i].health = 150;
							scene.monsterlist[i].status = 2;
						}
						else
							scene.monsterlist[i].body.destroy();
					}
				}
			}
			HitBox.destroy();
            hero.once('animationcomplete', () => {this.stateMachine.transistion('idle');});
        }
    }