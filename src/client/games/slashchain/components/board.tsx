import React, { FC } from "react";
import { TileBoard } from "@/client/games/slashchain/tile";
import { CellComponent } from "./cell";
import { Cell, CellSet } from "@/client/common/infinite_board";
import styled from "styled-components";

type ContainerProps = {
  className?: string;
  children?: never;
  move: (cell: Cell) => void;
  board: TileBoard;
};

type PresenterProps = {
  legalCells: CellSet;
  cells: Cell[][];
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  board,
  cells,
  legalCells,
  move,
}) => (
  <div className={className}>
    <table className="board">
      <tbody>
        {cells.map((cellRow) => (
          <tr key={cellRow[0].x}>
            {cellRow.map((cell) => (
              <CellComponent
                key={cell.y}
                {...{
                  isLegal: legalCells.has(cell),
                  tile: board.get(cell),
                  onClick: () => move?.(cell),
                }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StyledComponent = styled(DomComponent)`
  .board {
    margin: auto;
    table-layout: fixed;
    border-spacing: 0;
    border-collapse: collapse;
  }
`;

export const BoardComponent: React.FC<ContainerProps> = (props) => {
  const legalCells = props.board.legalCells();
  const range = legalCells.range();
  const cells: Cell[][] = [];
  for (let x = range.minX; x <= range.maxX; x++) {
    const cellRow: Cell[] = [];
    for (let y = range.minY; y <= range.maxY; y++) {
      cellRow.push({ x, y });
    }
    cells.push(cellRow);
  }
  return <StyledComponent legalCells={legalCells} cells={cells} {...props} />;
};
