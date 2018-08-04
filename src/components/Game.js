import React, { Component } from 'react';

import Board from './Board';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      width: 0,
      enemies: [],
      start: false,
      moveCount: 0,
      player: {
        x: null,
        y: null
      }
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { height, width, player } = nextProps;
    this.setState({
      height,
      width,
      player
    });
    this.generateEnemies(height, width);
  }

  componentDidUpdate() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    let { height, width, player, moveCount, enemies } = this.state;
    let playerMove;
    let count = moveCount;
    let playerPos = {
      x: player.x,
      y: player.y
    };
    switch (e.keyCode) {
      // Move left
      case 37:
        playerMove = player.x - 1 < 1 ? 0 : -1;
        playerPos.x += playerMove;
        if (enemies.length !== 0)
          count = player.x - 1 < 1 ? moveCount : moveCount + 1;
        break;
      // Move up
      case 38:
        playerMove = player.y - 1 < 1 ? 0 : -1;
        playerPos.y += playerMove;
        if (enemies.length !== 0)
          count = player.y - 1 < 1 ? moveCount : moveCount + 1;
        break;
      // Move right
      case 39:
        playerMove = player.x + 1 > width ? 0 : 1;
        playerPos.x += playerMove;
        if (enemies.length !== 0)
          count = player.x + 1 > width ? moveCount : moveCount + 1;
        break;
      // Move down
      case 40:
        playerMove = player.y + 1 > height ? 0 : 1;
        playerPos.y += playerMove;
        if (enemies.length !== 0)
          count = player.y + 1 > height ? moveCount : moveCount + 1;
        break;
      // Start game
      case 13:
        this.setState({
          start: true
        });
        break;
      default:
        break;
    }
    // Set new player position and increment move count.
    this.setState({
      player: playerPos,
      moveCount: count
    });
  }

  generateEnemies(h, w) {
    let { player, enemies } = this.state;
    let enmArr = [];
    // Number of enemies is square root of height * width
    let enemyCount = Math.floor(Math.sqrt(h * w));
    // Generate enemy with random coordinates.
    // Only push unique enemies to enemies array.
    while (enmArr.length < enemyCount) {
      let enemy = {};
      let enemyX = Math.floor(Math.random() * h + 1);
      let enemyY = Math.floor(Math.random() * w + 1);
      enemy.x = enemyX;
      enemy.y = enemyY;
      // Check if enemy position is in array
      let enmInArr = enemies.findIndex(
        enm => enm.x === enemy.x && enm.y === enemy.y
      );
      // Check if player position is in array
      let playerInArr = enemies.findIndex(
        enm => enm.x === player.x && enm.y === player.y
      );
      if (playerInArr < 0) {
        if (enmInArr < 0) {
          enmArr.push(enemy);
        }
      }
    }
    this.setState({
      enemies: enmArr
    });
  }

  render() {
    let { height, width, enemies, start, player, moveCount } = this.state;
    return (
      <div>
        <h1>Catch the zebras!</h1>
        <Board
          tabIndex="0"
          onKeyDown={this.handleKeyDown}
          start={start}
          player={player}
          height={height}
          width={width}
          enemies={enemies}
          moveCount={moveCount}
        />
      </div>
    );
  }
}

export default Game;
