import React from "react";
import { PlayerID, Ctx } from "boardgame.io";
import { GameState, PlayerState } from "./game_state";
import style from "../styles/field.module.scss";
import { Tile } from "../components";
import { TileComponent } from "./tile";

export interface HandsFieldProps {
  G: GameState;
  playerID: PlayerID;
  ctx: Ctx;
  myPlayerID?: PlayerID;
  updatePlayerState?: (state: PlayerState) => void;
}

export class HandsFieldComponent extends React.Component<
  HandsFieldProps,
  PlayerState
> {
  private gameState = this.props.G;

  constructor(props: HandsFieldProps) {
    super(props);
    this.state = {
      pickedTile: undefined,
    };
  }

  onClick(tile: Tile) {
    if (this.state.pickedTile === tile) {
      tile.rotate(1);
    }
    const state = {
      pickedTile: tile,
    };
    this.props.updatePlayerState?.(state);
    this.setState(state);
  }

  render() {
    const handClasses = [style.tile];
    let clickHandler: (tile: Tile) => void = () => {};
    const isMyTurn = this.props.ctx.currentPlayer === this.props.myPlayerID;
    const isMyField = this.props.myPlayerID === this.props.playerID;
    if (isMyTurn && isMyField) {
      clickHandler = (tile: Tile) => this.onClick(tile);
      handClasses.push(style.pickable);
    }

    const pickedTile = this.state.pickedTile;
    const tileItems = this.gameState.hands[this.props.playerID].tiles.map(
      (tile, i) => {
        const classes = pickedTile === tile ? [...handClasses, style.picked] : handClasses
        return (
          <div
            className={classes.join(" ")}
            key={`${this.props.playerID}:${i}`}
            onClick={() => clickHandler(tile)}
          >
            <TileComponent tile={tile} />
          </div>
        );
      }
    );

    return <div className={style.field}>{tileItems}</div>;
  }
}
