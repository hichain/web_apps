import React, { FC, useMemo } from "react";
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
  columns: number;
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
    <div className="board-grid">
      {cells.map((rows) =>
        rows
          .map((cell) => ({
            ...cell,
            isLegal: legalCells.has(cell),
            tile: board.get(cell),
          }))
          .map((cell) => (
            <StyledCell
              className={[
                cell.isLegal ? "available" : "",
                cell.tile != null ? "tile" : "",
                "cell",
              ].join(" ")}
              key={`${cell.x},${cell.y}`}
              data-x={cell.x}
              data-y={cell.y}
              onClick={cell.isLegal ? () => move(cell) : undefined}
            >
              {cell.tile != null && (
                <TileComponent className="tile" tile={cell.tile} />
              )}
            </StyledCell>
          ))
      )}
    </div>
  </div>
);

const StyledComponent = styled(DomComponent)`
  display: flex;
  align-items: center;
  justify-items: center;

  & > .board-grid {
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    grid-gap: 0;

    & > .cell {
      box-sizing: content-box;
      background-color: #fff;
      border: 0.1rem dashed #aaa;
      border-right: 0;
      border-bottom: 0;

      &:nth-child(n + 1):nth-child(-n + ${({ columns }) => columns}) {
        border-top: 0;
      }
      &:nth-child(${({ columns }) => columns}n + 1) {
        border-left: 0;
      }

      &.available {
        background-color: #ccc;
      }
    }
  }
`;

export const BoardComponent: React.FC<ContainerProps> = (props) => {
  const legalCells = useMemo(() => props.board.legalCells(), [props.board]);
  const range = useMemo(() => {
    const range = legalCells.range();
    return {
      minX: range.minX - 1,
      maxX: range.maxX + 1,
      minY: range.minY - 1,
      maxY: range.maxY + 1,
    };
  }, [legalCells]);
  const cells = useMemo(() => {
    const cells: Cell[][] = [];
    for (let y = range.minY; y <= range.maxY; y++) {
      const rows: Cell[] = [];
      for (let x = range.minX; x <= range.maxX; x++) {
        rows.push({ x, y });
      }
      cells.push(rows);
    }
    return cells;
  }, [range]);

  return (
    <StyledComponent
      legalCells={legalCells}
      columns={range.maxX - range.minX + 1}
      cells={cells}
      {...props}
    />
  );
};
