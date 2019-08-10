import React, { Component } from "react";
import Cell from "./Cell";
import uuid from "uuid";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 60
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.createBoard = this.createBoard.bind(this);
  }
  createBoard() {
    let board = [];
    let row = [];

    for (let j = 0; j < this.props.nrows; j++) {
      for (let i = 0; i < this.props.ncols; i++) {
        const rand = Math.floor(Math.random() * 100) + 1;
        row.push(rand <= this.props.chanceLightStartsOn ? true : false);
      }
      board.push(row);
      row = [];
    }
    console.log(board);

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
    const cells = board.flat(1).some(cell => cell === true);
    !cells && this.setState({ hasWon: true });
  }

  render() {
    return (
      <div className="Board">
        {this.state.hasWon ? (
          <h1>You win!</h1>
        ) : (
          <table>
            <tbody>
              {this.state.board.map((cells, idxRow) => (
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
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Board;
