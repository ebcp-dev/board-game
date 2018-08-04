import React, { Component } from 'react';
import './css/App.css';

import Game from './components/Game';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: null,
      width: null,
      player: {
        x: null,
        y: null
      }
    };
  }

  componentDidMount() {
    this.generateBoard();
  }

  generateBoard() {
    let heightInput = Number(prompt('Enter board height.'));
    let widthInput = Number(prompt('Enter board width.'));
    this.setState({
      height: heightInput,
      width: widthInput,
      player: {
        x: Math.floor(widthInput / 2),
        y: Math.floor(heightInput / 2)
      }
    });
  }

  render() {
    let { height, width, player } = this.state;
    return (
      <div className="center-screen">
        <Game
          height={height}
          width={width}
          player={player}
          generateBoard={this.generateBoard}
        />
      </div>
    );
  }
}

export default App;
