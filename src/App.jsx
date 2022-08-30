import React from "react";
import Square from "./Square";
import './App.css';
//import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isNextX: true,
      squares: Array(9).fill(null),
    };
  }

  restartGame() {
    this.setState({ isNextX: Math.random().toFixed() === 0 ? true : false, squares: Array(9).fill(null) })
  }

  checkWinner() {
    const winningMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let [a, b, c] of winningMoves) {
      var squares = this.state.squares;
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) { // squares[a] wins
        return this.state.squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    if (this.state.squares[i] != null || this.checkWinner())
      return

    var squaresCopy = this.state.squares.slice();
    squaresCopy[i] = this.state.isNextX ? "X" : "O";
    this.setState({ squares: squaresCopy, isNextX: !this.state.isNextX });
  }

  renderSquare(i) {
    return (
      <Square squareValue={this.state.squares[i]} onClick={() => this.handleClick(i)} />
    )
  }

  render() {
    const winner = this.checkWinner();
    var infoMessage = "";
    var isGameEnded = false;
    if (winner) {  // if not null, game ends
      infoMessage = "Game Over , Winner : " + winner;
      isGameEnded = true;
    }
    else {
      if (!this.state.squares.includes(null)) {
        isGameEnded = true;
        infoMessage = "Game Over , No Winners !"
      }
      else
        infoMessage = "Next Player : " + (this.state.isNextX ? 'X' : 'O');
    }


    return (
      <div className="App" >
        <div className="gameBoard">
          <div className="gameInfo">
            <h2>{infoMessage}</h2>
          </div>
          <div className="gameTable ">
            <div className="tableRow">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="tableRow">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="tableRow">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
          <div className="restart">
            {isGameEnded && <button className="restartButton" onClick={() => this.restartGame()}>Play Again</button>}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
