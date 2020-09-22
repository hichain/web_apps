import React from "react";
import { TileBoard } from "../components";
import style from "../styles/board.module.scss";
import {
  TileCellComponent,
  LegalCellComponent,
  EmptyCellComponent,
} from "./cell";
import { Cell } from "../infinite_board";

export interface BoardProps {
  move?: (cell: Cell) => void;
  board: TileBoard;
}

const cell = (
  board: TileBoard,
  legalCells: Set<Cell>,
  x: number,
  y: number,
  onClick?: (cell: Cell) => void
): JSX.Element => {
  const cell = { x, y };
  const tile = board.get(cell);
  if (tile != null) {
    return <TileCellComponent cell={cell} tile={tile} />;
  }
  const isLegalCell = legalCells.has(cell);
  if (isLegalCell) {
    return (
      <LegalCellComponent cell={cell} onClick={(): void => onClick?.(cell)} />
    );
  }
  return <EmptyCellComponent cell={cell} />;
};

const BoardComponent = (props: BoardProps): JSX.Element => {
  const legalCells = props.board.legalCells();
  const range = legalCells.range();
  const tbody = [];
  for (let x = range.minX; x <= range.maxX; x++) {
    const cells = [];
    for (let y = range.minY; y <= range.maxY; y++) {
      cells.push(cell(props.board, legalCells, x, y, props.move));
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
