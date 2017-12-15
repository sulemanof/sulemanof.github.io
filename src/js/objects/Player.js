import Phaser from 'phaser';

export default class Player extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.game.physics.arcade.enable(this);
    this.game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);

    this.body.bounce.y = 0;
    this.body.gravity.y = 400;
    this.body.collideWorldBounds = true;

    this.animations.add('walk');
    this.animations.add('idle', [0], 20, true);

    this.health = 100;
    this.crapSound = game.add.audio('crap');
    this.crapSound.volume = 0.5;
    this.gunShot = game.add.audio('gun');
    this.gunShot.volume = 0.5;
    this.explosionSound = game.add.audio('explosion');

    this.weapon = this.game.add.weapon(5, 'bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    this.weapon.bulletSpeed = 600;
    this.weapon.fireRate = 500;
    this.weapon.trackSprite(this, 0, 0, true);
    this.weapon.onFire.add(() => this.gunShot.play());

    this.fireButton = {};
    this.fireButton.isDown = false;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.camera.follow(this);
  }

  update() {
    this.body.velocity.x = 0;

    if (this.fireButton.isDown) {
      this.weapon.fire();
    }

    if (this.cursors.left.isDown) {
      if (this.weapon.bulletSpeed === 600) {
        this.weapon.bulletSpeed *= -1;
      }
      this.body.velocity.x = -250;
      this.scale.x = -1;
      this.animations.play('walk', 28);
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x = 250;
      this.scale.x = 1;
      this.animations.play('walk', 28);
      if (this.weapon.bulletSpeed === -600) {
        this.weapon.bulletSpeed *= -1;
      }
    } else {
      this.animations.play('idle');
    }

    if (this.cursors.up.isDown && this.body.onFloor()) {
      this.body.velocity.y = -350;
    }

    if (this.position.y > this.game.world.bounds.height - 64) {
      this.position.y = this.game.world.bounds.height - 90;
      this.game.gameInfo.mainSound.stop();
      this.crapSound.play();
      this.kill();
      setTimeout(() => this.game.state.start('GameOver'), 2000);
    }

    if (this.health <= 0) {
      this.game.gameInfo.healthText.text = 'x 0';
      this.game.gameInfo.mainSound.stop();
      const bang = this.game.add.sprite(this.position.x, this.position.y, 'bang');
      bang.anchor.setTo(0.5, 0.5);
      bang.animations.add('bang');
      bang.animations.play('bang', 15);
      this.explosionSound.play();
      this.health = 1;
      this.kill();
      setTimeout(() => this.game.state.start('GameOver'), 2000);
    }

    if (this.sheriffMode) {
      this.sheriffHat.position.x = this.position.x;
      this.sheriffHat.position.y = this.position.y;
    }
  }
}
