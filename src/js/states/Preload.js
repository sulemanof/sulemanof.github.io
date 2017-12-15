import Phaser from 'phaser';

export default class extends Phaser.State {
  preload() {
    this.add.sprite(0, 0, 'logo');
    this.preloadSound = this.add.audio('preload-theme', 1, true);
    this.preloadSound.volume = 0.2;
    // this.preloadSound.play();
    this.text = this.game.add.text(this.world.bounds.width / 2, this.world.bounds.height - 100, '', { fill: '#ffffff' });
    this.text.anchor.setTo(0.5, 0.5);
    this.preloadBar = this.game.add.sprite(this.world.bounds.width / 2, this.world.bounds.height - 150, 'bar');
    this.preloadBar.anchor.setTo(0.5, 0.5);

    this.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('background', 'assets/background-1.jpg');
    this.load.image('sheriff', 'assets/sheriff-player.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('restart_btn', 'assets/restart.png');
    this.load.spritesheet('tiles', 'assets/tiles.png', 64, 64);
    this.load.spritesheet('player', 'assets/player.png', 38, 48);
    this.load.spritesheet('bee', 'assets/enemies/bee.png', 37, 39);
    this.load.spritesheet('slug', 'assets/enemies/slug.png', 32, 21);
    this.load.spritesheet('plant', 'assets/enemies/plant.png', 61, 45);
    this.load.spritesheet('plant-attack', 'assets/enemies/plant-attack.png', 61, 45);
    this.load.spritesheet('bang', 'assets/bang.png', 128, 128);
    this.load.audio('hurt', 'assets/sounds/hurt.wav');
    this.load.audio('crap', 'assets/sounds/crap.wav');
    this.load.audio('coin', 'assets/sounds/coin.wav');
    this.load.audio('clap', 'assets/sounds/clap.wav');
    this.load.audio('gun', 'assets/sounds/gun.mp3');
    this.load.audio('pick_up', 'assets/sounds/pick_up.mp3');
    this.load.audio('spare', 'assets/sounds/spare.mp3');
    this.load.audio('explosion', 'assets/sounds/explosion.mp3');
    this.load.audio('main', 'assets/sounds/main_theme.mp3');
    this.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Fire.js');

    this.load.setPreloadSprite(this.preloadBar);
    this.load.onFileComplete.add(this.fileComplete, this);
  }

  create() {
    this.preloadBar.kill();
    this.text.setText('PRESS ENTER TO START');
    this.text.alpha = 0;
    this.add.tween(this.text).to({ alpha: 0.8 }, 700, 'Linear', true, 0, -1, true);
    const enterBtn = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterBtn.onDown.add(this.loadMain, this);
  }

  loadMain() {
    this.preloadSound.destroy();
    this.game.state.start('Main');
  }

  fileComplete(progress) {
    this.text.setText(`loading: ${progress}% `);
  }
}
