import 'pixi';
import 'p2';
import Phaser from 'phaser';

import Boot from './states/Boot';
import Preload from './states/Preload';
import Main from './states/Main';
import GameOver from './states/GameOver';

import css from '../styles/game.css';

class Game extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.AUTO, 'game');

    this.state.add('Boot', Boot, false);
    this.state.add('Preload', Preload, false);
    this.state.add('Main', Main, false);
    this.state.add('GameOver', GameOver, false);

    this.state.start('Boot');
  }
}

new Game();
