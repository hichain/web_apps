import React from "react";
import { GameState } from "./Game";
import { Ctx } from "boardgame.io";
import { Board } from "../board";

export interface IProps {
  moves: any;
  G: GameState;
  ctx: Ctx;
}

export class BoardComponent extends React.Component<IProps> {
	private gameState = this.props.G

  onClick(id: string) {
    this.props.moves.clickCell(id);
  }

  render() {
    const cellStyle: { [key: string]: string } = {
      border: "1px solid #555",
      width: "50px",
      height: "50px",
      lineHeight: "50px",
      textAlign: "center",
    };

    const range = boardRange(this.gameState.board);
    const tbody = [];
    for (let x = range.minX; x <= range.maxX; x++) {
      let cells = [];
      for (let y = range.minY; y <= range.maxY; y++) {
        const id = this.gameState.board.toCellString(x, y);
        cells.push(
          <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
            {this.gameState.board.cellFromString(id)?.tile.name}
          </td>
        );
      }
      tbody.push(<tr key={x}>{cells}</tr>);
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        <div id="winner">{this.winner()}</div>
      </div>
    );
  }

  winner() {
    if (!this.props.ctx.gameover) {
      return "";
    }
    if (this.props.ctx.gameover.winner !== undefined) {
      return `Winner: ${this.props.ctx.gameover.winner}`;
    } else {
      return "Draw!";
    }
  }
}

type BoardRange = { minX: number; maxX: number; minY: number; maxY: number };

const boardRange = (board: Board): BoardRange => {
  const xArray = board.tileCells.map((cell) => cell.x);
  const yArray = board.tileCells.map((cell) => cell.y);
  xArray.sort(numberSorter);
  yArray.sort(numberSorter);
  return {
    minX: xArray[0],
    maxX: xArray[xArray.length - 1],
    minY: yArray[0],
    maxY: yArray[yArray.length - 1],
  };
};

const numberSorter = (a: number, b: number): number => a - b;
