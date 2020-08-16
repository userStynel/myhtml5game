class LoadingScene extends Phaser.Scene
{
    constructor()
    {
        super('loadingScene');
    }
    preload()
    {
        this.load.image('logo', './assets/UI/seismic_production.png');
    }
    create()
    {
        this.add.image(660, 250, 'logo');
        var startTXT = this.add.text(660, 400, 'START!');
        startTXT.setInteractive();
        startTXT.on('pointerdown', function(){startTXT.scene.scene.start('playingScene');});
    }
    update()
    {

    }
}