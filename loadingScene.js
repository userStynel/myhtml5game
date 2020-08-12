class LoadingScene extends Phaser.Scene
{
    constructor()
    {
        super('loadingScene');
    }
    preload()
    {
        this.load.image('logo', './assets/UI/seismic_production.png');
        this.load.image('af', './assets/UI/af.png');
    }
    create()
    {
        this.add.image(360, 450, 'af');
        this.add.text(255, 550,'2019-07-09 ~ 2021-04-28');
        this.add.image(660, 250, 'logo');
        var startTXT = this.add.text(660, 400, 'START!');
        startTXT.setInteractive();
        startTXT.on('pointerdown', function(){startTXT.scene.scene.start('playingScene');});
    }
    update()
    {

    }
}