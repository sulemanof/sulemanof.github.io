import Phaser from 'phaser';
import Player from '../objects/Player';
import Bee from '../objects/Bee';
import Slug from '../objects/Slug';
import Plant from '../objects/Plant';
import setGameInfo from './setGameInfo';

export default class extends Phaser.State {
  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.bg = this.game.add.tileSprite(0, 0, 1475, 600, 'background');
    this.bg.fixedToCamera = true;

    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('tiles', 'tiles');
    this.map.setCollisionBetween(0, 4);
    this.map.setTileIndexCallback(5, this.collectCoin, this);
    this.map.setTileIndexCallback([6, 7], this.collectCard, this);
    this.map.setTileIndexCallback(8, this.collectBadge, this);
    this.map.setTileIndexCallback(9, this.gameFinish, this);
    this.map.setTileIndexCallback(11, this.healPlayer, this);
    this.map.setTileIndexCallback(12, this.giveWeaponToPlayer, this);

    this.tileLayer = this.map.createLayer('Tile Layer 1');
    this.tileLayer.resizeWorld();

    this.game.gameInfo = {};
    setGameInfo(this.game);

    this.player = new Player(this.game, this.map.objects.Player[0].x, this.map.objects.Player[0].y, 'player');
    for (let i = 0; i < this.map.objects.Plants.length; i++) {
      new Plant(this.game, this.map.objects.Plants[i].x, this.map.objects.Plants[i].y, 'plant', this);
    }
    for (let i = 0; i < this.map.objects.Bees.length; i++) {
      new Bee(this.game, this.map.objects.Bees[i].x, this.map.objects.Bees[i].y, 'bee', this);
    }
    for (let i = 0; i < this.map.objects.Slugs.length; i++) {
      new Slug(this.game, this.map.objects.Slugs[i].x, this.map.objects.Slugs[i].y, 'slug', this);
    }
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.tileLayer);
    this.game.physics.arcade.collide(this.player.weapon.bullets, this.tileLayer, b => b.kill(), null, this);
  }

  collectCoin(obj) {
    if (obj !== this.player) {
      return;
    }

    if (this.map.putTile(null, this.tileLayer.getTileX(obj.x), this.tileLayer.getTileY(obj.y))) {
      this.game.gameInfo.score += 10;
      this.game.gameInfo.scoreText.text = `x ${this.game.gameInfo.score}`;
      this.game.gameInfo.coinSound.play();
    }
  }

  collectCard(obj, tile) {
    if (obj !== this.player) {
      return;
    }

    if (this.map.putTile(null, this.tileLayer.getTileX(obj.x), this.tileLayer.getTileY(obj.y))) {
      this.game.gameInfo.spareSound.play();
      if (tile.index === 6) {
        this.game.gameInfo.redCard.frame = 12;
        this.game.gameInfo.redCard.finded = true;
      } else {
        this.game.gameInfo.greenCard.frame = 12;
        this.game.gameInfo.greenCard.finded = true;
      }
    }
  }

  collectBadge(obj) {
    if (obj !== this.player) {
      return;
    }

    if (this.map.putTile(null, this.tileLayer.getTileX(obj.x), this.tileLayer.getTileY(obj.y))) {
      this.game.gameInfo.pickUpSound.play();
      this.player.sheriffMode = true;
      this.player.loadTexture('sheriff');
      setTimeout(() => {
        this.player.sheriffMode = false;
        this.player.loadTexture('player');
      }, 10000);
    }
  }


  gameFinish() {
    if (this.finishText) {
      return;
    }
    if (this.game.gameInfo.greenCard.finded && this.game.gameInfo.redCard.finded) {
      this.game.gameInfo.mission = 'completed';
      this.game.gameInfo.mainSound.stop();
      this.game.state.start('GameOver');
    } else {
      this.finishText = true;
      const text = this.game.add.text(400, 200, 'You need to collect all spare parts', { fontSize: '26px', fill: '#fff' });
      text.anchor.setTo(0.5, 0, 5);
      text.fixedToCamera = true;
      setTimeout(() => { text.kill(); this.finishText = false; }, 1500);
    }
  }

  healPlayer(obj) {
    if (obj !== this.player || this.player.health === 100) {
      return;
    }

    if (this.map.putTile(null, this.tileLayer.getTileX(obj.x), this.tileLayer.getTileY(obj.y))) {
      this.game.gameInfo.pickUpSound.play();
      if (this.player.health < 50) {
        this.player.health += 50;
        this.game.gameInfo.healthText.text = `x ${this.player.health}`;
      } else {
        this.player.health = 100;
        this.game.gameInfo.healthText.text = `x ${this.player.health}`;
      }
    }
  }

  giveWeaponToPlayer(obj) {
    if (obj !== this.player) {
      return;
    }
    if (this.map.putTile(null, this.tileLayer.getTileX(obj.x), this.tileLayer.getTileY(obj.y))) {
      this.game.gameInfo.pickUpSound.play();
      this.player.weapon.resetShots();
      this.player.bulletText.text = `${5 - this.player.weapon.shots}`;
    }
  }
}
