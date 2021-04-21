import React, { FC, useCallback, useMemo, useState } from "react";
import { BoardComponent } from "./board";
import {
  GameState,
  Moves,
  TileBoard,
  Cell,
  NamedPlayer,
  playOrder,
  HandTiles,
  reverse,
} from "@games";
import { MyHandsComponent, PickedHand } from "./my_hands";
import { BoardProps } from "boardgame.io/dist/types/src/client/react";
import styled from "styled-components";
import { OtherHandsComponent } from "./other_hands";

type ContainerProps = BoardProps<GameState> & {
  className?: string;
  children?: never;
  moves: Moves;
};

type PresenterProps = {
  className?: string;
  player: NamedPlayer;
  board: TileBoard;
  hands: HandTiles;
  pickedTileIndex?: number;
  moves?: {
    pickTile: React.Dispatch<React.SetStateAction<PickedHand | undefined>>;
    putTile: (cell: Cell) => void;
  };
  gameResult: string;
};

const DomComponent: FC<PresenterProps> = ({
  className,
  player,
  board,
  hands,
  pickedTileIndex,
  moves,
  gameResult,
}) => (
  <div className={className}>
    <OtherHandsComponent
      className="hands other"
      hands={hands[reverse(player)]}
      player={reverse(player)}
    />
    <BoardComponent
      className="board"
      selectCell={moves?.putTile}
      board={board}
    />
    <MyHandsComponent
      className="hands me"
      hands={hands[player]}
      player={player}
      pickedTileIndex={pickedTileIndex}
      pickTile={moves?.pickTile}
    />
    <div id="winner">{gameResult}</div>
  </div>
);

const StyledComponent = styled(DomComponent)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 90%;
  min-height: 100vh;
  padding: 4rem 0;
  margin-right: auto;
  margin-left: auto;

  & > .board {
    flex: 1;
  }
`;

export const TabletopComponent: React.FC<ContainerProps> = (props) => {
  const [pickedTile, pickTile] = useState<PickedHand | undefined>();

  const player = playOrder[props.ctx.playOrderPos];
  const isMyTurn = props.ctx.currentPlayer === props.playerID;

  const gameResult = useMemo(() => {
    if (!props.ctx.gameover) {
      return "";
    }
    if (props.ctx.gameover.winner !== undefined) {
      return `Winner: ${props.ctx.gameover.winner}`;
    } else {
      return "Draw!";
    }
  }, [props.ctx.gameover]);

  const board = useMemo(() => new TileBoard(props.G.board), [props.G.board]);
  const hands = props.G.hands;

  const putTile = useCallback(
    (cell: Cell) => {
      if (pickedTile == null) {
        return;
      }
      props.moves.clickCell(cell.x, cell.y, pickedTile.index, pickedTile.angle);
      props.events.endTurn?.();
      pickTile(undefined);
    },
    [pickedTile, props.events, props.moves]
  );

  const moves = isMyTurn
    ? {
        pickTile,
        putTile,
      }
    : undefined;

  return (
    <StyledComponent
      {...{
        className: props.className,
        player,
        board,
        hands,
        pickedTileIndex: pickedTile?.index,
        moves,
        gameResult,
      }}
    />
  );
};
