import React, { Component } from 'react';

import Cell from './Cell';
import '../css/board.css';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardHeight: null,
      boardWidth: null,
      player: null,
      enemies: [],
      start: false,
      moveCount: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      boardHeight: nextProps.height,
      boardWidth: nextProps.width,
      player: nextProps.player,
      start: nextProps.start,
      enemies: nextProps.enemies,
      moveCount: nextProps.moveCount
    });
  }

  playGame() {
    let { boardHeight, boardWidth, player, enemies, moveCount } = this.state;
    // Render cells by row
    let rows = [];
    for (let i = 1; i <= boardHeight; i++) {
      let columns = [];
      for (let j = 1; j <= boardWidth; j++) {
        // Check if player x and y match cell position
        let playerInCell = player.x === j && player.y === i ? true : false;
        // Check if cell position matches any enemy position in enemies array
        let enemyPos = {
          x: j,
          y: i
        };
        // Get index of enemy in cell
        let enemyInCell = enemies.findIndex(
          enm => enm.x === enemyPos.x && enm.y === enemyPos.y
        );
        // Delete from enemies array if player occupies same cell
        if (playerInCell === true && enemyInCell > -1) {
          enemies.splice(enemyInCell, 1);
          if (enemies.length === 0) {
            return (
              <div>
                <h1>Game Over</h1>
                <h3>Total moves: {moveCount}</h3>
              </div>
            );
          }
        }
        // Css styles on the cells
        let playerBackground = playerInCell ? 'player' : '';
        let enemyBackground = enemyInCell > -1 ? 'enemy' : '';
        columns.push(
          <td
            key={i + j}
            className={`cell ${enemyBackground} ${playerBackground} `}
          >
            <Cell player={playerInCell} enemy={enemyInCell > -1} />
          </td>
        );
      }
      rows.push(<tr key={i}>{columns}</tr>);
    }
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  render() {
    let { start, moveCount, boardHeight, boardWidth } = this.state;
    return (
      <div>
        {start ? (
          <div>
            <h3>Use arrow keys to move character.</h3>
            <p>
              Board size: {boardHeight} x {boardWidth}
            </p>
            <p>Moves: {moveCount}</p>
            {this.playGame()}
          </div>
        ) : (
          <h3>Press enter to start.</h3>
        )}
      </div>
    );
  }
}

export default Board;
