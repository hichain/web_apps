import React from "react";
import { PlayerHands } from "../hands";
import { Tile } from "../components";
import type { IProps } from "./board";
import { Board } from "../board.js";

export type GameState = {
  ruleName: string;
  board: Board;
  hands: { [key: string]: PlayerHands };
  pickedTile?: Tile;
};

export class GameStateComponent extends React.Component<IProps> {
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
