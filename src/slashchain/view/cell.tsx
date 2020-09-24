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

export const EmptyCellComponent: React.FC = () => <td className={style.cell} />;

export const LegalCellComponent: React.FC<LegalCellProps> = (
  props: LegalCellProps
) => (
  <td
    className={[style.cell, style.available].join(" ")}
    onClick={(): void => props.onClick()}
  ></td>
);

export const TileCellComponent: React.FC<TileCellProps> = (props) => (
  <td className={[style.cell, style.available].join(" ")}>
    <div className={style.tile}>
      <TileComponent tile={props.tile} />
    </div>
  </td>
);
