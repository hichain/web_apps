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
import { Hand, HandsComponent } from "./hands";
import { BoardProps } from "boardgame.io/dist/types/src/client/react";
import styled from "styled-components";

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
  pickedTile?: Hand;
  moves?: {
    pickTile: (index: number) => void;
    rotateTile: Moves["rotateTile"];
    putTile: (cell: Cell) => void;
  };
  gameResult: string;
};

const DomComponent: FC<PresenterProps> = ({
  className,
  player,
  board,
  hands,
  pickedTile,
  moves,
  gameResult,
}) => (
  <div className={className}>
    <HandsComponent
      className="hands other"
      hands={hands[reverse(player)]}
      player={reverse(player)}
    />
    <BoardComponent className="board" move={moves?.putTile} board={board} />
    <HandsComponent
      className="hands me"
      hands={hands[player]}
      player={player}
      pickedTile={pickedTile}
      moves={moves && { pick: moves.pickTile, rotate: moves.rotateTile }}
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
  const [pickedTile, pick] = useState<Hand | undefined>(undefined);

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
      props.moves.clickCell(cell.x, cell.y, pickedTile.index);
      props.events.endTurn?.();
      pick(undefined);
    },
    [pickedTile, props.events, props.moves]
  );

  const pickTile = useCallback((index: number) => {
    pick({ index });
  }, []);

  const rotateTile = useCallback(
    (index: number, dir: number): void => {
      pick({ index, dir: (pickedTile?.dir ?? 0) + dir });
      props.moves.rotateTile(index, dir);
    },
    [pickedTile, props.moves]
  );

  const moves = isMyTurn
    ? {
        putTile,
        pickTile,
        rotateTile,
      }
    : undefined;

  return (
    <StyledComponent
      {...{
        className: props.className,
        player,
        board,
        hands,
        pickedTile,
        moves,
        gameResult,
      }}
    />
  );
};
