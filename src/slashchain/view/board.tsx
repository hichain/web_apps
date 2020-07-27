import React from "react";
import { TileCell, TileBoard } from "../components";
import style from "../styles/board.module.scss";
import CellComponent from "./cell";

export interface BoardProps {
  move: (x: number, y: number) => void;
  board: TileBoard;
}

const BoardComponent = (props: BoardProps) => {
  const onClick = (cell: TileCell) => props.move(cell.x, cell.y);

  const range = props.board.range();
  const tbody = [];
  for (let x = range.minX; x <= range.maxX; x++) {
    let cells = [];
    for (let y = range.minY; y <= range.maxY; y++) {
      cells.push(
        <CellComponent
          cellKey={`${x},${y}`}
          cell={props.board.getTileCell({ x, y })}
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
