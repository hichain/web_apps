import React from "react";
import { TileCell } from "../components";
import style from "../styles/board.module.scss";
import { TileComponent } from "./tile";

export interface CellProps {
  key: string;
  cell?: TileCell;
  onClick: (cell: TileCell) => void;
}

export class CellComponent extends React.Component<CellProps> {
  render() {
    const classes = [style.cell];
    const cell = this.props.cell;
    const key = this.props.key;
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
        onClick={() => this.props.onClick(cell)}
      >
        <div className={style.tile}>{cellBody}</div>
      </td>
    );
  }
}
