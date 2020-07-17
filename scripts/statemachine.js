function searchingMonster(scene, HITBOX)
{
	for(var i = 0; i<scene.monsterlist.length; i++)
	{
		if(scene.physics.world.collide(HITBOX, scene.monsterlist[i].body))
		{
			// 체력바 세로길이 86px;
			//-86*10/(fullhp)
			//alert("Hit Test: Monster " + i + " health: " + scene.monsterlist[i].health);
			scene.monsterlist[i].minusHealth();
			scene.monsterlist[i].healthbar.gauge.fillRect(0, 0, -86*(100+50*(scene.monsterlist[i].status == 2)-scene.monsterlist[i].health)/(100+50*(scene.monsterlist[i].status == 2)), 12);
			scene.monsterlist[i].body.setX(scene.monsterlist[i].body.x-5.5*Math.cos(scene.monsterlist[i].direction));
		scene.monsterlist[i].body.setY(scene.monsterlist[i].body.y-5.5*Math.sin(scene.monsterlist[i].direction));
			if(scene.monsterlist[i].health <= 0)
			{
				if(scene.monsterlist[i].status == 1)
				{
					scene.monsterlist[i].body.anims.stop();
					scene.monsterlist[i].body.setTexture('redmonster');
					scene.monsterlist[i].health = 150;
					scene.monsterlist[i].status = 2;
					scene.monsterlist[i].healthbar.gauge.clear();
				}
				else
				{
					scene.monsterlist[i].body.destroy();
					scene.monsterlist[i].healthbar.background.destroy();
					scene.monsterlist[i].healthbar.gauge.destroy();
					scene.monsterlist.splice(i, 1);
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
			height = 86;
			width = 30;
			x = hero.body.x-width;
			y = hero.body.y-((height-hero.body.height)/2);
		}
		else if(hero.direction == 'right')
		{
			height = 86;
			width = 30;
			x = hero.body.x+hero.body.width;
			y = hero.body.y-((height-hero.body.height)/2);
		}
		else if(hero.direction == 'up')
		{
			height = 30;
			width = 86;
			x = hero.body.x-((width-hero.body.width)/2);
			y = hero.body.y-height;
		}
		else if(hero.direction == 'down')
		{
			height = 30;
			width = 86;
			x = hero.body.x-((width-hero.body.width)/2);
			y = hero.body.y+hero.body.height;
		}
		hero.body.anims.play('attack_'+hero.direction);
		HitBox = scene.physics.add.sprite(x,y, null);
		HitBox.setOrigin(0, 0);
		HitBox.setSize(width, height);
		//HitBox.anims.play('hiteffectmotion');
		searchingMonster(scene, HitBox);
		HitBox.destroy();
		//HitBox.once('animationcomplete', () => {HitBox.destroy();});
        hero.body.once('animationcomplete', () => {this.stateMachine.transistion('idle');});
	}
}



class MonsterIdleState extends State
{
	enter(scene, monster)
	{
		monster.body.setVelocity(0, 0);
		monster.hideHealthbar(true);
	}
	execute(scene, monster)
	{
		if(Phaser.Math.Distance.Between(scene.player.body.x+scene.player.body.width/2, scene.player.body.y+scene.player.body.height/2, monster.body.x+monster.body.width/2, monster.body.y+monster.body.height/2)<=130)
		{
			monster.direction = Phaser.Math.Angle.Between(monster.body.x+monster.body.width/2, monster.body.y+monster.body.height/2,scene.player.body.x+scene.player.body.width/2, scene.player.body.y+scene.player.body.height/2);
			if(100*monster.health/(100+50*(monster.status==2)) >= 50)
				this.stateMachine.transistion('chasing');
			else
				this.stateMachine.transistion('running');
		}
		monster.body.anims.play(monster.body.texture.key+'-idle', true);
	}
}


class MonsterChasingState extends State
{
	enter(scene, monster)
	{
		monster.hideHealthbar(false);
	}
	execute(scene, monster)
	{
		monster.body.anims.play(monster.body.texture.key+'-idle', true);
		monster.body.setX(monster.body.x+0.3*Math.cos(monster.direction));
		monster.body.setY(monster.body.y+0.3*Math.sin(monster.direction));
		if(Phaser.Math.Distance.Between(scene.player.body.x+scene.player.body.width/2, scene.player.body.y+scene.player.body.height/2, monster.body.x+monster.body.width/2, monster.body.y+monster.body.height/2)>130)
		{
			this.stateMachine.transistion('idle');
		}
		else if(100*monster.health/(100+50*(monster.status==2)) < 50)
			this.stateMachine.transistion('running');
	}
}


class MonsterRunState extends State
{
	enter(scene, monster)
	{
		monster.hideHealthbar(false);
	}
	execute(scene, monster)
	{
		monster.body.anims.play(monster.body.texture.key+'-idle', true);
		monster.body.setX(monster.body.x+0.3*Math.cos(-monster.direction));
		monster.body.setY(monster.body.y+0.3*Math.sin(-monster.direction));
		if(Phaser.Math.Distance.Between(scene.player.body.x+scene.player.body.width/2, scene.player.body.y+scene.player.body.height/2, monster.body.x+monster.body.width/2, monster.body.y+monster.body.height/2)>130)
		{
			this.stateMachine.transistion('idle');
		}
		else if(100*monster.health/(100+50*(monster.status==2)) >= 50)
		{
			this.stateMachine.transistion('chasing');
		}
	}
}
