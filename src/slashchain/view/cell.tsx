import React from "react";
import { TileCell } from "../components";
import style from "../styles/board.module.scss";
import { TileComponent } from "./tile";

export interface CellProps {
  key: string;
  cell?: TileCell;
  onClick: (cell: TileCell) => void;
}

const CellComponent = (props: CellProps) => {
  const classes = [style.cell];
  const cell = props.cell;
  const key = props.key;
  if (cell == null) {
    return <td className={classes.join(" ")} key={key} />;
  }
  classes.push(style.available);
  let cellBody;
  if (cell.tile != null) {
    cellBody = <TileComponent tile={cell.tile} />;
  }
  return (
    <td
      className={classes.join(" ")}
      key={key}
      onClick={() => props.onClick(cell)}
    >
      <div className={style.tile}>{cellBody}</div>
    </td>
  );
};

export default CellComponent
