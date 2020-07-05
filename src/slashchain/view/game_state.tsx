import React from "react";
import { BoardComponent } from "./board";
import { PlayerHands } from "../hands";
import { Board } from "../board";
import { HandsFieldComponent } from "./hands_field";
import { Ctx } from "boardgame.io";
import { Tile } from "../components.js";

export type GameState = {
  ruleName: string;
  board: Board;
  hands: { [key: string]: PlayerHands };
};

export interface PlayerState {
  pickedTile?: Tile;
}

export interface GameStateProps {
  playerID: null;
  moves: any;
  G: GameState;
  ctx: Ctx;
}

export class GameComponent extends React.Component<
  GameStateProps,
  PlayerState
> {
  constructor(props: GameStateProps) {
    super(props);
    this.state = {
      pickedTile: undefined,
    };
  }

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
          updatePlayerState={this.updatePlayerState.bind(this)}
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
        <BoardComponent
          moves={this.props.moves}
          G={this.props.G}
          pickedTile={this.state.pickedTile}
        />
        {myHandsField}
        <div id="winner">{this.winner()}</div>
      </div>
    );
  }

  updatePlayerState(state: PlayerState) {
    this.setState(state);
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
