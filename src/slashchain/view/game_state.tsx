import React from "react";
import BoardComponent from "./board";
import { Ctx, PlayerID } from "boardgame.io";
import { GameState, Moves } from "../game";
import { TileBoard } from "../components";
import { PickableHandsComponent, HandsComponent } from "./hands_field";
import { EventsAPI } from "boardgame.io/dist/types/src/plugins/events/events";

export interface PlayerState {
  pickedTile?: {
    index: number;
    rotate?: number;
  };
}

export interface GameStateProps {
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
    const playerIDs = this.playerIDs();
    if (playerIDs == null) {
      return <div />;
    }

    const myHands = this.props.G.hands[playerIDs.me];
    const myHandsField = () => {
      if (this.isMyTurn()) {
        return (
          <PickableHandsComponent
            hands={myHands}
            playerID={playerIDs.me}
            pickedTile={this.state.pickedTile}
            pick={this.pickTile.bind(this)}
            rotate={this.rotateTile.bind(this)}
          />
        );
      } else {
        return <HandsComponent hands={myHands} playerID={playerIDs.me} />;
      }
    };

    const otherHands = this.props.G.hands[playerIDs.other];
    const otherHandsField = (
      <HandsComponent hands={otherHands} playerID={playerIDs.other} />
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

  playerIDs(): Players | undefined {
    const me = this.props.playerID;
    const other = this.props.ctx.playOrder.find((player) => player !== me);
    if (me == null || other == null) {
      return undefined;
    }
    return { me, other };
  }

  isMyTurn() {
    return this.props.ctx.currentPlayer === this.props.playerID;
  }

  clickCell(x: number, y: number) {
    const pickedTile = this.state.pickedTile;
    if (pickedTile != null) {
      this.props.moves.clickCell(x, y, pickedTile.index);
      this.props.events.endTurn?.();
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
    const pickedTile = {
      index: this.state.pickedTile.index,
      rotate: (this.state.pickedTile.rotate ?? 0) + dir,
    };
    this.setState({ pickedTile });
    this.props.moves.rotateTile(pickedTile.index, dir);
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
