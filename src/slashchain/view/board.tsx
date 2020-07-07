import React from "react";
import { Board } from "../board";
import { TileCell, Tile } from "../components";
import style from "../styles/board.module.scss";
import { CellComponent } from "./cell";

export interface BoardProps {
  moves: any;
  board: Board;
  pickedTile?: Tile;
}

export class BoardComponent extends React.Component<BoardProps> {
  constructor(props: BoardProps) {
    super(props);
    this.cell = this.cell.bind(this);
  }

  onClick(cell?: TileCell) {
    this.props.moves.clickCell(cell, this.props.pickedTile);
  }

  cell(x: number, y: number) {
    return this.props.board.tileCells.find(i => i.equals(x, y));
  }

  render() {
    const range = boardRange(this.props.board);
    const tbody = [];
    for (let x = range.minX; x <= range.maxX; x++) {
      let cells = [];
      for (let y = range.minY; y <= range.maxY; y++) {
        cells.push(
          <CellComponent
            key={`${x},${y}`}
            cell={this.cell(x, y)}
            onClick={this.onClick.bind(this)}
          />
        );
      }
      tbody.push(<tr key={x}>{cells}</tr>);
    }

    return (
      <div>
        <table className={style.board}>
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
