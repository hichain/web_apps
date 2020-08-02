import React from "react";
import BoardComponent from "./board";
import { HandsFieldComponent } from "./hands_field";
import { Ctx, PlayerID } from "boardgame.io";
import { GameState, Moves } from "../game";
import { TileBoard } from "../components";

export interface PlayerState {
  pickedTile?: {
    index: number;
    rotate?: number;
  };
}

export interface GameStateProps {
  playerID: PlayerID;
  moves: Moves;
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
          pickedTile={this.state.pickedTile}
          pick={this.pickTile.bind(this)}
          rotate={this.rotateTile.bind(this)}
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
          move={this.clickCell.bind(this)}
          board={new TileBoard(this.props.G.board)}
        />
        {myHandsField}
        <div id="winner">{this.winner()}</div>
      </div>
    );
  }

  clickCell(x: number, y: number) {
    const pickedTile = this.state.pickedTile;
    if (pickedTile != null) {
      this.props.moves.clickCell(x, y, pickedTile.index);
    }
  }

  pickTile(index: number) {
    this.setState({
      pickedTile: { index },
    });
  }

  rotateTile(dir: number) {
    if (this.state.pickedTile == null) {
      return;
    }
    this.setState({
      pickedTile: {
        index: this.state.pickedTile.index,
        rotate: dir,
      },
    });
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
