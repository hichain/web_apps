import React, { FC, useMemo } from "react";
import { Cell, CellArray, offset, Tile, TileBoard } from "@games";
import styled from "styled-components";
import ScrollContainer from "react-indiana-drag-scroll";
import { BoardTileComponent } from "./board_tile";

type ContainerProps = {
  className?: string;
  children?: never;
  selectCell?: (cell: Cell) => void;
  board: TileBoard;
};

type PresenterProps = {
  cells: Array<Cell & { tile?: Tile; isLegal: boolean }>;
  columns: number;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, cells, columns, selectCell }) => {
  return (
    <ScrollContainer className={className} hideScrollbars={false}>
      <div className="board-grid">
        {cells.map((cell) => (
          <BoardTileComponent
            key={`${cell.x},${cell.y}`}
            columns={columns}
            tile={cell.tile}
            isLegal={cell.isLegal}
            onClick={cell.isLegal ? () => selectCell?.(cell) : undefined}
          />
        ))}
      </div>
    </ScrollContainer>
  );
};

const StyledComponent = styled(DomComponent)`
  display: flex;
  align-items: center;
  justify-items: center;
  overflow-x: scroll;
  overflow-y: scroll;

  & > .board-grid {
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    grid-gap: 0;
    max-height: 100%;
    margin: auto;
  }
`;

export const BoardComponent: React.FC<ContainerProps> = (props) => {
  const { board } = props;
  
  const { cells, range } = useMemo(() => {
    const legalCells = board.legalCells();
    const range = offset(legalCells.toArray().range(), {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1,
    });
    const cells = CellArray.fromRange(range);
    return {
      cells: cells.map((cell) => ({
        ...cell,
        isLegal: legalCells.has(cell),
        tile: board.get(cell),
      })),
      range,
    };
  }, [board]);

  return (
    <StyledComponent
      {...props}
      cells={cells}
      columns={range.maxX - range.minX + 1}
    />
  );
};
