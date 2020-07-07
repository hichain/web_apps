import React from "react";
import { BoardComponent } from "./board";
import { HandsFieldComponent } from "./hands_field";
import { Ctx, PlayerID } from "boardgame.io";
import { Tile } from "../components";
import { GameState } from "../game";

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

  hands(player: PlayerID | null | undefined) {
    if (player == null) {
      return null;
    }
    return this.props.G.hands[player];
  }

  isMyTurn() {
    return this.props.ctx.currentPlayer === this.props.playerID;
  }

  render() {
    const playerID = this.props.playerID;
    let myHandsField;
    const myHands = this.hands(playerID);
    if (myHands != null) {
      myHandsField = (
        <HandsFieldComponent
          hands={myHands}
          isMyTurn={this.isMyTurn()}
          updatePlayerState={this.updatePlayerState.bind(this)}
        />
      );
    }

    const otherPlayerID = this.props.ctx.playOrder.find(
      (player) => player !== playerID
    );
    let otherHandsField;
    const otherHands = this.hands(otherPlayerID);
    if (otherHands != null) {
      otherHandsField = (
        <HandsFieldComponent hands={otherHands} isMyTurn={false} />
      );
    }

    return (
      <div>
        {otherHandsField}
        <BoardComponent
          moves={this.props.moves}
          board={this.props.G.board}
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
