import React from "react";
import { Board } from "../board";
import { TileCell, Tile } from "../components";
import style from "../styles/board.module.scss";
import CellComponent from "./cell";

export interface BoardProps {
  moves: any;
  board: Board;
  pickedTile?: Tile;
}

const BoardComponent = (props: BoardProps) => {
  const onClick = (cell: TileCell) =>
    props.moves.clickCell(cell, props.pickedTile);
  const cell = (x: number, y: number) =>
    props.board.tileCells.find((i) => TileCell.equals(i, { x, y }));

  const range = boardRange(props.board);
  const tbody = [];
  for (let x = range.minX; x <= range.maxX; x++) {
    let cells = [];
    for (let y = range.minY; y <= range.maxY; y++) {
      cells.push(
        <CellComponent
          cellKey={`${x},${y}`}
          cell={cell(x, y)}
          onClick={onClick}
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
};

export default BoardComponent;

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
