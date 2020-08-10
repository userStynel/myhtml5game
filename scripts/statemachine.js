function poison(duration, scene)
{
	console.log("poison function start!", duration);
	if(duration > 0)
	{
		if(scene.player.body.poison != true)
		{
			scene.headerUI.heart.destroy();
			delete scene.headerUI.heart;
			scene.headerUI.heart = scene.add.image(10, 10, 'heart');
			scene.headerUI.heart.setOrigin(0, 0);
			scene.headerUI.heart.setDepth(6);
			scene.headerUI.heart.setScrollFactor(0, 0);
			return;
			
		}
		scene.player.health -= 7;
		scene.headerUI.heartBar.fillRect(0, 0, scene.player.health-333, 48);
		setTimeout(function(){poison(duration-1, scene)}, 1000);
	}
	else if(duration == 0)
	{
		delete scene.player.body.poison;
		scene.headerUI.heart.destroy();
		delete scene.headerUI.heart;
		scene.headerUI.heart = scene.add.image(10, 10, 'heart');
		scene.headerUI.heart.setOrigin(0, 0);
		scene.headerUI.heart.setDepth(6);
		scene.headerUI.heart.setScrollFactor(0, 0);
	}
}
function setHitBoxPosition(hero)
{
	var height, width, x, y;
	if(hero.direction == 'left')
	{
		height = 96;
		width = 30;
		x = hero.body.x-width;
		y = hero.body.y-((height-hero.body.height)/2);
	}
	else if(hero.direction == 'right')
	{
		height = 96;
		width = 30;
		x = hero.body.x+hero.body.width;
		y = hero.body.y-((height-hero.body.height)/2);
	}
	else if(hero.direction == 'up')
	{
		height = 30;
		width = 96;
		x = hero.body.x -((width-hero.body.width)/2);
		y = hero.body.y-height;
	}
	else if(hero.direction == 'down')
	{
		height = 30;
		width = 96;
		x = hero.body.x-((width-hero.body.width)/2);
		y = hero.body.y+hero.body.height;
	}
	hero.HITBOX.setPosition(x, y);
	hero.HITBOX.setDisplaySize(width, height);
	
}

function healthBarFollowObject(monster)
{
	monster.healthbar.background.setX(monster.body.x+monster.body.width/2-47);
	monster.healthbar.gauge.setX(monster.body.x+monster.body.width/2-47+90);
	monster.healthbar.background.setY(monster.body.y-15);
	monster.healthbar.gauge.setY(monster.body.y-13);
}

function checkInTheHitBox(hitBox, monster)
{
	var hbTop = hitBox.y;
	var hbBottom = hitBox.y + hitBox.displayHeight;
	var hbLeft = hitBox.x;
	var hbRight = hitBox.x + hitBox.displayWidth;
	
	var monsterTop = monster.y;
	var monsterBottom = monster.y + monster.displayHeight;
	var monsterLeft = monster.x;
	var monsterRight = monster.x + monster.displayWidth;
	
	if(hbRight >= monsterLeft && hbLeft <= monsterRight && hbTop <= monsterBottom && hbBottom >= monsterTop)
		return true;
	return false;
}

function checkAnomaly(hero, tiles, scene)
{
	var heroTop = hero.y;
	var heroBottom = hero.y + hero.displayHeight;
	var heroLeft = hero.x;
	var heroRight = hero.x + hero.displayWidth;
	for(var i =0; i<tiles.length; i++)
	{
		var tileTop = tiles[i].pixelY+64;
		var tileBottom = tiles[i].pixelY+64 + tiles[i].height;
		var tileLeft = tiles[i].pixelX;
		var tileRight = tiles[i].pixelX + tiles[i].width;
		//console.log("player", heroTop, heroBottom, heroLeft, heroRight);
		//console.log("tile-"+i.toString(),tileTop, tileBottom, tileLeft, tileRight);
		if(heroRight >= tileLeft && heroLeft <= tileRight && heroTop <= tileBottom && heroBottom >= tileTop)
		{
			if(tiles[i].index == 16)
			{
				if(hero.poison != true)
				{
					hero.poison = true;
					scene.headerUI.heart.destroy();
					delete scene.headerUI.heart;
					scene.headerUI.heart = scene.add.image(10, 10, 'heart-poison');
					scene.headerUI.heart.setOrigin(0, 0);
					scene.headerUI.heart.setDepth(6);
					scene.headerUI.heart.setScrollFactor(0, 0);
					poison(25, scene);
				}
			}
			else
				delete hero.poison;
			return true;
		}
	}
	return false;
}

function searchingMonster(scene, HITBOX)
{
	for(var i = 0; i<scene.monsterlist.length; i++)
	{
		if(checkInTheHitBox(HITBOX, scene.monsterlist[i].body))
		{
			scene.monsterlist[i].minusHealth();
			scene.monsterlist[i].healthbar.gauge.fillRect(0, 0, -86*(100+50*(scene.monsterlist[i].status == 2)-scene.monsterlist[i].health)/(100+50*(scene.monsterlist[i].status == 2)), 12);
			scene.monsterlist[i].body.setX(scene.monsterlist[i].body.x-5.5*Math.cos(scene.monsterlist[i].direction));
			scene.monsterlist[i].body.setY(scene.monsterlist[i].body.y-5.5*Math.sin(scene.monsterlist[i].direction));
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
			if(scene.once == null)
				this.stateMachine.transistion('swing');
			else
			{
				scene.once.anims.play('chest-open');
				scene.once = null;
			}
            return;
        }
		if(hero.body.poison == undefined)
        	hero.body.anims.play('idle-'+hero.direction, true);
		else
			hero.body.anims.play('idle-'+hero.direction+'-poison', true);
    }
}

class MoveState extends State
{
    execute(scene, hero)
    {
		hero.body.setVelocity(0);
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
        	//hero.body.setX(hero.body.x-0.7);
			hero.body.setVelocityX(-100);
            hero.direction = "left"
        }
        if(scene.keys.D.isDown)
		{
           // hero.body.setX(hero.body.x+0.7);
			hero.body.setVelocityX(100);
            hero.direction = "right"
		}
        if(scene.keys.W.isDown)
        {
			//hero.body.setY(hero.body.y-0.7);
			hero.body.setVelocityY(-100);
			hero.direction = "up";
        }
        if(scene.keys.S.isDown)
        {
			//hero.body.setY(hero.body.y+0.7);
			hero.body.setVelocityY(100);
            hero.direction = "down";
        }
		if(checkAnomaly(hero.body, scene.anomalyTile, scene))
			console.log('changed');
		if(hero.body.poison == true)
			hero.body.anims.play('walking-'+hero.direction+'-poison', true);
		else
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
		setHitBoxPosition(hero);
		hero.body.anims.play('attack_'+hero.direction);
		searchingMonster(scene, hero.HITBOX);
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
		if(monster.health <= 0)
			this.stateMachine.transistion('dead');
		else if(Phaser.Math.Distance.Between(scene.player.body.x+scene.player.body.width/2, scene.player.body.y+scene.player.body.height/2, monster.body.x+monster.body.width/2, monster.body.y+monster.body.height/2)<=130)
		{
		
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
		monster.body.setVelocity(0, 0);
		monster.direction = Phaser.Math.Angle.Between(monster.body.x+monster.body.width/2, monster.body.y+monster.body.height/2,scene.player.body.x+scene.player.body.width/2, scene.player.body.y+scene.player.body.height/2);
		monster.body.anims.play(monster.body.texture.key+'-idle', true);
		monster.body.setVelocityX(15*Math.cos(monster.direction));
		monster.body.setVelocityY(15*Math.sin(monster.direction));
		
		healthBarFollowObject(monster);
		if(monster.health <= 0)
			this.stateMachine.transistion('dead');
		else if(Phaser.Math.Distance.Between(scene.player.body.x+scene.player.body.width/2, scene.player.body.y+scene.player.body.height/2, monster.body.x+monster.body.width/2, monster.body.y+monster.body.height/2)>130)
		{
			this.stateMachine.transistion('idle');
		}
		else if(100*monster.health/(100+50*(monster.status==2)) < 50)
		{
			this.stateMachine.transistion('running');
		}
	}
}


class MonsterRunState extends State
{
	enter(scene, monster)
	{
		//scene.actingQueue.push(monster);
		monster.hideHealthbar(false);
	}
	execute(scene, monster)
	{
		monster.body.setVelocity(0, 0);
		//scene.actingQueue.push(monster);
		monster.direction = Phaser.Math.Angle.Between(monster.body.x+monster.body.width/2, monster.body.y+monster.body.height/2,scene.player.body.x+scene.player.body.width/2, scene.player.body.y+scene.player.body.height/2);
		monster.body.anims.play(monster.body.texture.key+'-idle', true);
		monster.body.setVelocityX(-10*Math.cos(monster.direction));
		monster.body.setVelocityY(-10*Math.sin(monster.direction));
		
		healthBarFollowObject(monster);
		if(monster.health <= 0)
			this.stateMachine.transistion('dead');
		else if(Phaser.Math.Distance.Between(scene.player.body.x+scene.player.body.width/2, scene.player.body.y+scene.player.body.height/2, monster.body.x+monster.body.width/2, monster.body.y+monster.body.height/2)>130)
		{
			this.stateMachine.transistion('idle');
		}
		else if(100*monster.health/(100+50*(monster.status==2)) >= 50)
		{
			this.stateMachine.transistion('chasing');
		}
	}
}


class MonsterDeadState extends State
{
	enter(scene, monster)
	{
		console.log('dead stock!');
		monster.body.anims.play(monster.body.texture.key+'-dead');
		monster.body.once('animationcomplete', function(){monster.body.destroy(); monster.healthbar.background.destroy(); monster.healthbar.gauge.destroy(); scene.monsterlist.splice(scene.monsterlist.indexOf(monster), 1);});
	}
}
