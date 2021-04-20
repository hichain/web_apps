import React, { FC, useState } from "react";
import { BoardComponent } from "./board";
import { Ctx, PlayerID } from "boardgame.io";
import { GameState, Moves, Tile, TileBoard, Cell, NamedPlayer } from "@games";
import { Hand, HandsComponent } from "./hands";
import { EventsAPI } from "boardgame.io/dist/types/src/plugins/events/events";
import { BoardProps } from "boardgame.io/dist/types/src/client/react";
import styled from "styled-components";

type Players = {
  me: NamedPlayer;
  other: NamedPlayer;
};

type ContainerProps = BoardProps & {
  children?: never;
  playerID: PlayerID;
  moves: Moves;
  events: EventsAPI;
  G: GameState;
  ctx: Ctx;
};

type PresenterProps = {
  className?: string;
  players: Players;
  board: TileBoard;
  hands: {
    me: Tile[];
    other: Tile[];
  };
  isMyTurn: boolean;
  pickedTile?: Hand;
  moves: {
    pickTile: (index: number) => void;
    rotateTile: Moves["rotateTile"];
    putTile: (cell: Cell) => void;
  };
  gameResult: string;
};

const DomComponent: FC<PresenterProps> = ({
  className,
  players,
  board,
  hands,
  isMyTurn,
  pickedTile,
  moves,
  gameResult,
}) => (
  <div className={className}>
    <HandsComponent
      className="hands other"
      hands={hands.other}
      playerID={players.other}
      pickable={false}
    />
    <BoardComponent className="board" move={moves.putTile} board={board} />
    <HandsComponent
      className="hands me"
      hands={hands.me}
      playerID={players.me}
      {...(isMyTurn
        ? {
            pickable: true,
            pickedTile,
            pick: moves.pickTile,
            rotate: moves.rotateTile,
          }
        : {
            pickable: false,
          })}
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

  const me: NamedPlayer = props.playerID === "0" ? "slash" : "backslash";
  const other: NamedPlayer = me === "slash" ? "backslash" : "slash";
  if (me == null || other == null) {
    return <div />;
  }

  const players = { me, other };
  const isMyTurn = props.ctx.currentPlayer === props.playerID;

  const gameResult = (ctx: Ctx): string => {
    if (!ctx.gameover) {
      return "";
    }
    if (ctx.gameover.winner !== undefined) {
      return `Winner: ${ctx.gameover.winner}`;
    } else {
      return "Draw!";
    }
  };

  const hands = {
    me: props.G.hands[players.me],
    other: props.G.hands[players.other],
  };

  const putTile = (cell: Cell): void => {
    if (pickedTile != null) {
      props.moves.clickCell(cell.x, cell.y, pickedTile.index);
      const endTurn = props.events.endTurn;
      if (endTurn != null) {
        endTurn();
      }
    }
  };

  const pickTile = (index: number): void => {
    pick({ index });
  };

  const rotateTile = (index: number, dir: number): void => {
    pick({ index, dir: (pickedTile?.dir ?? 0) + dir });
    props.moves.rotateTile(index, dir);
  };

  return (
    <StyledComponent
      {...{
        players,
        board: new TileBoard(props.G.board),
        hands,
        pickedTile,
        isMyTurn,
        moves: {
          putTile,
          pickTile,
          rotateTile,
        },
        gameResult: gameResult(props.ctx),
      }}
    />
  );
};
