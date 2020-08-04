import React from "react";
import BoardComponent from "./board";
import { Ctx, PlayerID } from "boardgame.io";
import { GameState, Moves } from "../game";
import { TileBoard } from "../components";
import { PickableHandsComponent, HandsComponent } from "./hands_field";

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

  isMyTurn() {
    return this.props.ctx.currentPlayer === this.props.playerID;
  }

  render() {
    const playerID = this.props.playerID;
    const otherPlayerID = this.props.ctx.playOrder.find(
      (player) => player !== playerID
    );
    if (otherPlayerID == null) {
      return <div />;
    }

    const myHands = this.props.G.hands[playerID];
    if (myHands == null) {
      return <div />;
    }
    const myHandsField = () => {
      if (this.isMyTurn()) {
        return (
          <PickableHandsComponent
            hands={myHands}
            playerID={playerID}
            pickedTile={this.state.pickedTile}
            pick={this.pickTile.bind(this)}
            rotate={this.rotateTile.bind(this)}
          />
        );
      } else {
        return <HandsComponent hands={myHands} playerID={playerID} />;
      }
    };

    const otherHands = this.props.G.hands[otherPlayerID];
    if (otherHands == null) {
      return <div />;
    }
    const otherHandsField = (
      <HandsComponent hands={otherHands} playerID={otherPlayerID} />
    );

    return (
      <div>
        {otherHandsField}
        <BoardComponent
          move={this.clickCell.bind(this)}
          board={new TileBoard(this.props.G.board)}
        />
        {myHandsField()}
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
