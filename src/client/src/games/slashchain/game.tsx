import React, { FC, useState } from "react";
import { BoardComponent } from "./board";
import { Ctx, PlayerID } from "boardgame.io";
import { GameState, Moves, Tile, TileBoard, Cell } from "@games";
import { Hand, HandsComponent } from "./hands";
import { EventsAPI } from "boardgame.io/dist/types/src/plugins/events/events";
import { BoardProps } from "boardgame.io/dist/types/src/client/react";

type Players = {
  me: PlayerID;
  other: PlayerID;
};

type ContainerProps = BoardProps & {
  playerID: PlayerID;
  moves: Moves;
  events: EventsAPI;
  G: GameState;
  ctx: Ctx;
};

type PresenterProps = {
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
  players,
  board,
  hands,
  isMyTurn,
  pickedTile,
  moves,
  gameResult,
}) => (
  <div>
    <HandsComponent
      hands={hands.other}
      playerID={players.other}
      pickable={false}
    />
    <BoardComponent move={moves.putTile} board={board} />
    <HandsComponent
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

export const GameComponent: React.FC<ContainerProps> = (props) => {
  const [pickedTile, pick] = useState<Hand | undefined>(undefined);

  const me = props.playerID;
  const other = props.ctx.playOrder.find((player) => player !== me);
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
    <DomComponent
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
