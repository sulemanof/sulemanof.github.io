import Phaser from 'phaser';

export default (game) => {
  const obj = game.gameInfo;
  obj.coinImg = game.add.sprite(0, 44, 'tiles');
  obj.coinImg.frame = 4;
  obj.coinImg.fixedToCamera = true;
  obj.healthImg = game.add.sprite(16, 16, 'tiles');
  obj.healthImg.scale.set(0.5);
  obj.healthImg.frame = 9;
  obj.healthImg.fixedToCamera = true;

  obj.score = 0;
  obj.scoreText = game.add.text(0, 0, 'x 0', { fontSize: '24px', fill: '#fff' });
  obj.scoreText.alignTo(obj.coinImg, Phaser.RIGHT_CENTER);
  obj.scoreText.fixedToCamera = true;

  obj.healthText = game.add.text(0, 0, 'x 100', { fontSize: '24px', fill: '#fff' });
  obj.healthText.alignTo(obj.healthImg, Phaser.RIGHT_CENTER, 16);
  obj.healthText.fixedToCamera = true;

  obj.mainSound = game.add.audio('main');
  obj.mainSound.play('', 5);
  obj.coinSound = game.add.audio('coin');
  obj.coinSound.volume = 0.3;
  obj.spareSound = game.add.audio('spare');
  obj.pickUpSound = game.add.audio('pick_up');

  obj.redCard = game.add.sprite(16, 106, 'tiles');
  obj.redCard.scale.set(0.5);
  obj.redCard.frame = 5;
  obj.redCard.fixedToCamera = true;

  obj.greenCard = game.add.sprite(58, 106, 'tiles');
  obj.greenCard.scale.set(0.5);
  obj.greenCard.frame = 6;
  obj.greenCard.fixedToCamera = true;
};
