class HeaderUI
{
	constructor(scene)
	{
		this.background = scene.add.graphics({x:0, y:0});
		this.background.fillStyle('0x383E56', 1);
		this.background.fillRect(0, 0, 1320, 80);
		this.background.setDepth(5);
		
		this.heart = scene.add.sprite(10, 10, 'heart');
		this.heart.setOrigin(0, 0);
		this.heart.setDepth(6);
		
		this.heartBar = scene.add.graphics({x:406, y:18});
		this.heartBar.fillStyle('0xDDF3F5', 1);
		this.heartBar.setDepth(7);
	}
	
}

function createUI(scene)
{
	scene.headerUI = new HeaderUI(scene);
}