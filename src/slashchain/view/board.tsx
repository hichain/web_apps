import React from "react";
import { GameState } from "./game_state";
import { Board } from "../board";
import { Cell, TileCell } from "../components";

export interface BoardProps {
  moves: any;
  G: GameState;
}

export class BoardComponent extends React.Component<BoardProps> {
  private gameState = this.props.G;

  onClick(cell?: TileCell) {
    this.props.moves.clickCell(cell);
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
        const key = `${x},${y}`;
        const cell = this.gameState.board.tile(new Cell(x, y));
        cells.push(
          <td style={cellStyle} key={key} onClick={() => this.onClick(cell)}>
            {cell?.tile.name}
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
      </div>
    );
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
