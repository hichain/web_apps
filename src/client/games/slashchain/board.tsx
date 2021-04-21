import React, { FC, useMemo } from "react";
import { TileBoard, Cell, CellSet } from "@games";
import styled from "styled-components";
import { BoardTileComponent } from "./board_tile";

type ContainerProps = {
  className?: string;
  children?: never;
  selectCell?: (cell: Cell) => void;
  board: TileBoard;
};

type PresenterProps = {
  cells: Cell[];
  legalCells: CellSet;
  columns: number;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  board,
  cells,
  legalCells,
  columns,
  selectCell,
}) => (
  <div className={className}>
    <div className="board-grid">
      {cells.map((cell) => (
        <BoardTileComponent
          key={`${cell.x},${cell.y}`}
          columns={columns}
          cell={cell}
          tile={board.get(cell)}
          onClick={legalCells.has(cell) ? () => selectCell?.(cell) : undefined}
        />
      ))}
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
  const rows = useMemo(() => range.maxY - range.minY + 1, [range]);
  const columns = useMemo(() => range.maxX - range.minX + 1, [range]);
  const cells = useMemo(
    () =>
      new Array(rows * columns).fill(null).map((_, i) => ({
        x: range.minX + (i % columns),
        y: range.minY + Math.floor(i / columns),
      })),
    [columns, range.minX, range.minY, rows]
  );

  return (
    <StyledComponent
      legalCells={legalCells}
      columns={range.maxX - range.minX + 1}
      cells={cells}
      {...props}
    />
  );
};
