import React, { useState } from "react";
import BoardComponent from "./board";
import { Ctx, PlayerID } from "boardgame.io";
import { GameState, Moves } from "../game";
import { TileBoard } from "../components";
import { PickableHandsComponent, HandsComponent } from "./hands_field";
import { EventsAPI } from "boardgame.io/dist/types/src/plugins/events/events";
import { Cell } from "../infinite_board";
import { BoardProps } from "boardgame.io/dist/types/src/client/react";

export interface Hand {
  index: number;
  dir?: number;
}

export interface GameStateProps extends BoardProps {
  playerID: PlayerID;
  moves: Moves;
  events: EventsAPI;
  G: GameState;
  ctx: Ctx;
}

interface Players {
  me: PlayerID;
  other: PlayerID;
}

const players = (props: GameStateProps): Players | undefined => {
  const me = props.playerID;
  const other = props.ctx.playOrder.find((player) => player !== me);
  if (me == null || other == null) {
    return undefined;
  }
  return { me, other };
};

const isMyTurn = (props: GameStateProps) => {
  return props.ctx.currentPlayer === props.playerID;
};

const gameResult = (ctx: Ctx) => {
  if (!ctx.gameover) {
    return "";
  }
  if (ctx.gameover.winner !== undefined) {
    return `Winner: ${ctx.gameover.winner}`;
  } else {
    return "Draw!";
  }
};

export const GameComponent = (props: GameStateProps) => {
  const [pickedTile, pick] = useState<Hand | undefined>(undefined);
  const playerIDs = players(props);
  if (playerIDs == null) {
    return <div />;
  }

  const myHands = props.G.hands[playerIDs.me];
  const myHandsField = () => {
    if (isMyTurn(props)) {
      return (
        <PickableHandsComponent
          hands={myHands}
          playerID={playerIDs.me}
          pickedTile={pickedTile}
          pick={(i) => pick({ index: i })}
          rotate={(i, dir) => {
            pick({ index: i, dir: (pickedTile?.dir ?? 0) + dir });
            props.moves.rotateTile(i, dir);
          }}
        />
      );
    } else {
      return <HandsComponent hands={myHands} playerID={playerIDs.me} />;
    }
  };

  const otherHands = props.G.hands[playerIDs.other];
  const otherHandsField = (
    <HandsComponent hands={otherHands} playerID={playerIDs.other} />
  );

  const move = () => {
    if (pickedTile != null) {
      return (cell: Cell) => {
        props.moves.clickCell(cell.x, cell.y, pickedTile.index);
        props.events.endTurn?.();
      };
    }
  };

  return (
    <div>
      {otherHandsField}
      <BoardComponent move={move()} board={new TileBoard(props.G.board)} />
      {myHandsField()}
      <div id="winner">{gameResult(props.ctx)}</div>
    </div>
  );
};
