import React, { useState } from "react";
import { BoardComponent } from "./board";
import { Ctx, PlayerID } from "boardgame.io";
import { GameState, Moves } from "@slashchain/game";
import { TileBoard } from "@slashchain/tile";
import { HandsComponent } from "./hands";
import { EventsAPI } from "boardgame.io/dist/types/src/plugins/events/events";
import { Cell } from "@common/infinite_board";
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

const isMyTurn = (props: GameStateProps): boolean => {
  return props.ctx.currentPlayer === props.playerID;
};

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

export const GameComponent: React.FC<GameStateProps> = (props) => {
  const [pickedTile, pick] = useState<Hand | undefined>(undefined);
  const playerIDs = players(props);
  if (playerIDs == null) {
    return <div />;
  }

  const myHands = props.G.hands[playerIDs.me];
  const MyHandsField: React.FC<GameStateProps> = (props) => {
    if (isMyTurn(props)) {
      return (
        <HandsComponent
          hands={myHands}
          playerID={playerIDs.me}
          pickable
          pickedTile={pickedTile}
          pick={(i): void => pick({ index: i })}
          rotate={(i, dir): void => {
            pick({ index: i, dir: (pickedTile?.dir ?? 0) + dir });
            props.moves.rotateTile(i, dir);
          }}
        />
      );
    } else {
      return (
        <HandsComponent
          hands={myHands}
          playerID={playerIDs.me}
          pickable={false}
        />
      );
    }
  };

  const otherHands = props.G.hands[playerIDs.other];
  const otherHandsField = (
    <HandsComponent
      hands={otherHands}
      playerID={playerIDs.other}
      pickable={false}
    />
  );

  const move = (cell: Cell): void => {
    if (pickedTile != null) {
      props.moves.clickCell(cell.x, cell.y, pickedTile.index);
      const endTurn = props.events.endTurn;
      if (endTurn != null) {
        endTurn();
      }
    }
  };

  return (
    <div>
      {otherHandsField}
      <BoardComponent move={move} board={new TileBoard(props.G.board)} />
      {MyHandsField(props)}
      <div id="winner">{gameResult(props.ctx)}</div>
    </div>
  );
};
