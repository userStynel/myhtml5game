class HeaderUI
{
	constructor(scene)
	{
		this.background = scene.add.graphics({x:0, y:0});
		this.background.fillStyle('0x383E56', 1);
		this.background.fillRect(0, 0, 1320, 80);
		this.background.setDepth(5);
		this.background.setScrollFactor(0, 0);
		
		this.heart = scene.add.image(10, 10, 'heart');
		this.heart.setOrigin(0, 0);
		this.heart.setDepth(6);
		this.heart.setScrollFactor(0, 0);
		
		
		this.heartBar = scene.add.graphics({x:406, y:18});
		this.heartBar.fillStyle('0xDDF3F5', 1);
		this.heartBar.setDepth(7);
		this.heartBar.setScrollFactor(0, 0);
		
	}
	
}

class HealthBar
{
	constructor(scene, monster)
	{
		this.background = scene.add.sprite(monster.body.x+monster.body.width/2-47, monster.body.y-15, 'monsterhealthbar');
		this.background.setOrigin(0, 0);
		this.gauge = scene.add.graphics({x:monster.body.x+monster.body.width/2-47+90, y:monster.body.y-13});
		this.gauge.fillStyle('0XDDF3F5', 1);
	}
	
}


function createUI(scene)
{
	scene.headerUI = new HeaderUI(scene);
}