function searchingMonster(scene, HITBOX)
{
	for(var i = 0; i<scene.monsterlist.length; i++)
	{
		if(scene.physics.world.collide(HITBOX, scene.monsterlist[i].body))
		{
			// 체력바 세로길이 86px;
			//-86*10/(fullhp)
			alert("Hit Test: Monster " + i + " health: " + scene.monsterlist[i].health);
			scene.monsterlist[i].minusHealth();
			scene.monsterlist[i].gauge.fillRect(0, 0, -86*(100+50*(scene.monsterlist[i].status == 2)-scene.monsterlist[i].health)/(100+50*(scene.monsterlist[i].status == 2)), 12);
			if(scene.monsterlist[i].health <= 0)
			{
				if(scene.monsterlist[i].status == 1)
				{
					scene.monsterlist[i].body.anims.stop();
					scene.monsterlist[i].body.setTexture('redmonster');
					scene.monsterlist[i].health = 150;
					scene.monsterlist[i].status = 2;
					scene.monsterlist[i].gauge.clear();
				}
				else
				{
					scene.monsterlist[i].body.destroy();
					scene.monsterlist[i].gauge.destroy();
					scene.monsterlist[i].healthbar.destroy();
				}
			}
		}
	}	
}

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
        hero.body.setVelocity(0);
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
        hero.body.anims.play('idle-'+hero.direction, true);
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
        	hero.body.setVelocityX(-50);
            hero.direction = "left"
        }
        if(scene.keys.D.isDown)
		{
            hero.body.setVelocityX(50);
            hero.direction = "right"
		}
        if(scene.keys.W.isDown)
        {
			hero.body.setVelocityY(-50);
			hero.direction = "up";
        }
        if(scene.keys.S.isDown)
        {
			hero.body.setVelocityY(50);
            hero.direction = "down";
        }
       hero.body.anims.play('walking-'+hero.direction, true);
	}
}

class SwingState extends State
{
    enter(scene, hero)
    {
		var HitBox;
		var collider;
		var x, y, height, width;
		hero.body.setVelocityX(0);
		if(hero.direction == 'left')
		{
			height = 64;
			width = 3;
			x = hero.body.x;
			y = hero.body.y-((height-hero.body.height)/2);
		}
		else if(hero.direction == 'right')
		{
			height = 64;
			width = 3;
			x = hero.body.x+hero.body.width;
			y = hero.body.y-((height-hero.body.height)/2);
		}
		else if(hero.direction == 'up')
		{
			height = 3;
			width = 64;
			x = hero.body.x-((width-hero.body.width)/2);
			y = hero.body.y-height;
		}
		else if(hero.direction == 'down')
		{
			height = 3;
			width = 64;
			x = hero.body.x-((width-hero.body.width)/2);
			y = hero.body.y+hero.body.height;
		}
		hero.body.anims.play('attack_'+hero.direction);
		HitBox = scene.physics.add.sprite(x,y, null);
		HitBox.setOrigin(0, 0);
		HitBox.height =height;
		HitBox.width = width;
		searchingMonster(scene, HitBox);
		HitBox.destroy();
        hero.body.once('animationcomplete', () => {this.stateMachine.transistion('idle');});
	}
}