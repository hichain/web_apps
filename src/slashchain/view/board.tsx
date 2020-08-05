import React from "react";
import { TileBoard, Cell } from "../components";
import style from "../styles/board.module.scss";
import {
  TileCellComponent,
  LegalCellComponent,
  EmptyCellComponent,
} from "./cell";

export interface BoardProps {
  move: (x: number, y: number) => void;
  board: TileBoard;
}

const BoardComponent = (props: BoardProps) => {
  const legalCells = props.board.legalMoves();
  const range = legalCells.range();
  const tbody = [];
  for (let x = range.minX; x <= range.maxX; x++) {
    let cells = [];
    for (let y = range.minY; y <= range.maxY; y++) {
      cells.push(cell(props.board, legalCells, x, y, () => props.move(x, y)));
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

const cell = (
  board: TileBoard,
  legalCells: Set<Cell>,
  x: number,
  y: number,
  onClick: (cell: Cell) => void
) => {
  const cell = { x, y };
  const tile = board.get(cell);
  if (tile != null) {
    return <TileCellComponent cell={cell} tile={tile} />;
  }
  const isLegalCell = legalCells.has(cell);
  if (isLegalCell) {
    return <LegalCellComponent cell={cell} onClick={onClick} />;
  }
  return <EmptyCellComponent cell={cell} />;
};

export default BoardComponent;
