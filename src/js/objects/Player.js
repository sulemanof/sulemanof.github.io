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
    this.weapon.fireLimit = 5;
    this.bulletText = this.game.add.text(0, 0, '5', { fontSize: '24px', fill: '#fff' });
    this.bulletText.alignTo(this.game.gameInfo.weaponImg, Phaser.LEFT_CENTER, 10);
    this.bulletText.fixedToCamera = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.camera.follow(this);

    this.immune = false;
    this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  }

  update() {
    if (!this.immune) {
      this.body.velocity.x = 0;
    }

    if (this.fireButton.isDown) {
      this.weapon.fire();
      this.bulletText.text = `${5 - this.weapon.shots}`;
    }

    if (this.cursors.left.isDown && !this.immune) {
      if (this.weapon.bulletSpeed === 600) {
        this.weapon.bulletSpeed *= -1;
      }
      this.body.velocity.x = -250;
      this.scale.x = -1;
      this.animations.play('walk', 28);
    } else if (this.cursors.right.isDown && !this.immune) {
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
      this.game.camera.shake(0.05, 300);
      const bang = this.game.add.sprite(this.position.x, this.position.y, 'bang');
      bang.anchor.setTo(0.5, 0.5);
      bang.animations.add('bang');
      bang.animations.play('bang', 20, false, true);
      this.explosionSound.play();
      this.health = 1;
      this.kill();
      setTimeout(() => this.game.state.start('GameOver'), 2000);
    }
  }
}
