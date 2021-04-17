import React, { FC } from "react";
import { TileBoard, Cell, CellSet } from "@games";
import styled from "styled-components";
import { StyledCell } from "./cell";
import { TileComponent } from "./tile";

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
              <td key={cell.y}>
                <StyledCell
                  className={legalCells.has(cell) ? "available cell" : "cell"}
                  key={cell.y}
                  onClick={() => move?.(cell)}
                >
                  {() => {
                    const tile = board.get(cell);
                    return tile && <TileComponent tile={tile} />;
                  }}
                </StyledCell>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StyledComponent = styled(DomComponent)`
  display: flex;
  align-items: center;

  .board {
    margin: auto;
    table-layout: fixed;
    border-spacing: 0;
    border-collapse: collapse;

    .cell {
      &.available {
        border: 1px solid #555;
      }
    }
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
