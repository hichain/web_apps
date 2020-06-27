import React from "react";
import { BoardComponent } from "./board";
import { PlayerHands } from "../hands";
import { Board } from "../board";
import { HandsFieldComponent } from "./hands_field";
import { Ctx, BoardProps } from "boardgame.io";

export type GameState = {
  ruleName: string;
  board: Board;
  hands: { [key: string]: PlayerHands };
  pickedTileIndex?: number;
};

export interface GameStateProps extends BoardProps {
  moves: any;
  G: GameState;
  ctx: Ctx;
}

export class GameStateComponent extends React.Component<GameStateProps> {
  render() {
    const playerID = this.props.playerID;
    let myHandsField;
    if (playerID !== null) {
      myHandsField = (
        <HandsFieldComponent
          G={this.props.G}
          playerID={playerID}
          ctx={this.props.ctx}
          myPlayerID={playerID}
        />
      );
    }

    const otherPlayerID = this.props.ctx.playOrder.find(
      (player) => player !== playerID
    );
    let otherHandsField;
    if (otherPlayerID !== undefined) {
      otherHandsField = (
        <HandsFieldComponent
          G={this.props.G}
          playerID={otherPlayerID}
          ctx={this.props.ctx}
          myPlayerID={playerID ?? undefined}
        />
      );
    }

    return (
      <div>
        {otherHandsField}
        <BoardComponent moves={this.props.moves} G={this.props.G} />
        {myHandsField}
        <div id="winner">{this.winner()}</div>
      </div>
    );
  }

  winner() {
    if (!this.props.ctx.gameover) {
      return "";
    }
    if (this.props.ctx.gameover.winner !== undefined) {
      return `Winner: ${this.props.ctx.gameover.winner}`;
    } else {
      return "Draw!";
    }
  }
}
