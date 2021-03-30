import React from "react";
import { TileBoard } from "@slashchain/tile";
import style from "../styles/board.module.scss";
import {
  TileCellComponent,
  LegalCellComponent,
  EmptyCellComponent,
} from "./cell";
import { Cell } from "@common/infinite_board";

export interface BoardProps {
  move?: (cell: Cell) => void;
  board: TileBoard;
}

interface CellProps {
  board: TileBoard;
  legalCells: Set<Cell>;
  x: number;
  y: number;
  onClick?: (cell: Cell) => void;
}

const cell: React.FC<CellProps> = (props) => {
  const cell = { x: props.x, y: props.y };
  const tile = props.board.get(cell);
  if (tile != null) {
    return <TileCellComponent cell={cell} key={cell.y} tile={tile} />;
  }
  const isLegalCell = props.legalCells.has(cell);
  if (isLegalCell) {
    return (
      <LegalCellComponent
        cell={cell}
        key={cell.y}
        onClick={(): void => props.onClick?.(cell)}
      />
    );
  }
  return <EmptyCellComponent key={cell.y} />;
};

const BoardComponent: React.FC<BoardProps> = (props) => {
  const legalCells = props.board.legalCells();
  const range = legalCells.range();
  const tbody = [];
  for (let x = range.minX; x <= range.maxX; x++) {
    const cells = [];
    for (let y = range.minY; y <= range.maxY; y++) {
      cells.push(
        cell({ board: props.board, legalCells, x, y, onClick: props.move })
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
