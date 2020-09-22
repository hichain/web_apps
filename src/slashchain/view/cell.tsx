import React from "react";
import { Tile } from "../components";
import style from "../styles/board.module.scss";
import { TileComponent } from "./tile";
import { Cell } from "../infinite_board";

interface CellProps {
  cell: Cell;
}

export interface LegalCellProps extends CellProps {
  onClick: () => void;
}

export interface TileCellProps extends CellProps {
  cell: Cell;
  tile: Tile;
}

const key = (cell: Cell): string => `${cell.x},${cell.y}`;

export const EmptyCellComponent = (props: CellProps): JSX.Element => {
  return <td className={style.cell} key={key(props.cell)} />;
};

export const LegalCellComponent = (props: LegalCellProps): JSX.Element => {
  return (
    <td
      className={[style.cell, style.available].join(" ")}
      key={key(props.cell)}
      onClick={(): void => props.onClick()}
    ></td>
  );
};

export const TileCellComponent = (props: TileCellProps): JSX.Element => {
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
