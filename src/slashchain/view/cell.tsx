import React from "react";
import { Tile } from "../components";
import style from "../styles/board.module.scss";
import { TileComponent } from "./tile";
import { Cell } from "../infinite_board";

interface CellProps {
  cell: Cell;
}

export interface LegalCellProps extends CellProps {
  onClick: (cell: Cell) => void;
}

export interface TileCellProps extends CellProps {
  cell: Cell;
  tile: Tile;
}

const key = (cell: Cell) => `${cell.x},${cell.y}`;

export const EmptyCellComponent = (props: CellProps) => {
  return <td className={style.cell} key={key(props.cell)} />;
};

export const LegalCellComponent = (props: LegalCellProps) => {
  return (
    <td
      className={[style.cell, style.available].join(" ")}
      key={key(props.cell)}
      onClick={() => props.onClick(props.cell)}
    ></td>
  );
};

export const TileCellComponent = (props: TileCellProps) => {
  return (
    <td
      className={[style.cell, style.available].join(" ")}
      key={key(props.cell)}
    >
      <div className={style.tile}>
        <TileComponent tile={props.tile} />
      </div>
    </td>
  );
};
