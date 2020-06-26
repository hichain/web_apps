import React from "react";
import { PlayerHands } from "../hands";
import { Tile } from "../components";
import { Board } from "../board.js";
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
    return (
      <div>
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
