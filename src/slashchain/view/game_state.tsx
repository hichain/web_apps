import React from "react";
import { BoardComponent } from "./board";
import { PlayerHands } from "../hands";
import { Tile } from "../components";
import { Board } from "../board";
import { HandsFieldComponent } from "./hands_field";
import { Ctx } from "boardgame.io";

export type GameState = {
  ruleName: string;
  board: Board;
  hands: { [key: string]: PlayerHands };
  pickedTile?: Tile;
};

export interface GameStateProps {
  moves: any;
  G: GameState;
  ctx: Ctx;
}

export class GameStateComponent extends React.Component<GameStateProps> {
  private gameState = this.props.G;

  render() {
    const style: { [key: string]: string } = {
      margin: "auto",
    };
    const playerID = this.props.ctx.playerID;
    const otherPlayerID = this.props.ctx.playOrder.find(
      (player) => player !== playerID
    );
    if (playerID === undefined || otherPlayerID === undefined) return;

    return (
      <div style={style}>
        <HandsFieldComponent G={this.props.G} playerID={otherPlayerID} />
        <BoardComponent moves={this.props.moves} G={this.props.G} />
        <HandsFieldComponent G={this.props.G} playerID={playerID} />
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
