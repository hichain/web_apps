import { Cell, Tile, TileBoard } from "@games";
import { useAppSelector } from "@redux/hooks/useAppSelector";
import { useBoard } from "@/games/hooks/useBoard";
import React, { FC } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import styled from "styled-components";
import { BoardTileComponent } from "./board_tile";

type ContainerProps = {
  className?: string;
  children?: never;
  board: TileBoard;
};

type PresenterProps = {
  cells: Array<{
    cell: Cell;
    tile?: Tile;
    isLegal: boolean;
    isFocused: boolean;
  }>;
  columns: number;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, cells, columns }) => {
  return (
    <ScrollContainer className={className} hideScrollbars={false}>
      <div className="board-grid">
        {cells.map(({ cell, tile, isFocused, isLegal }) => (
          <BoardTileComponent
            key={`${cell.x},${cell.y}`}
            columns={columns}
            cell={cell}
            tile={tile}
            isFocused={isFocused}
            isLegal={isLegal}
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
  box-shadow: inset 0 0 5px 5px #efefef;

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
  const isMyTurn = useAppSelector((state) => state.match.isMyTurn);
  const { cells, range } = useBoard(board, isMyTurn);

  return (
    <StyledComponent
      {...props}
      cells={cells}
      columns={range.maxX - range.minX + 1}
    />
  );
};
