import React, { Component } from "react";
import Cell from "./Cell";
import uuid from "uuid";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nrows: 6,
    ncols: 6,
    chanceLightStartsOn: 0.4
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }
  createBoard() {
    const { nrows, ncols, chanceLightStartsOn } = this.props;
    let board = [];

    for (let j = 0; j < nrows; j++) {
      let row = [];
      for (let i = 0; i < ncols; i++) {
        row.push(Math.random() <= chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);

    this.setState({ board });
    this.checkIfWin(this.state.board);
  }

  async checkIfWin(board) {
    const cellsLit = board.flat(1).some(cell => cell === true);
    !cellsLit && this.setState({ hasWon: true });
  }

  render() {
    const createTable = this.state.board.map((cells, idxRow) => (
      <tr key={uuid.v4()}>
        {cells.map((cell, idxCol) => (
          <Cell
            x={idxRow}
            y={idxCol}
            isLit={cell}
            key={uuid.v4()}
            flipCellsAroundMe={this.flipCellsAround}
          />
        ))}
      </tr>
    ));
    return (
      <div className="Board">
        {this.state.hasWon ? (
          <h1>You win!</h1>
        ) : (
          <table>
            <tbody>{createTable}</tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Board;
