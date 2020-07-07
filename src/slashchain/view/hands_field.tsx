import React from "react";
import style from "../styles/field.module.scss";
import { Tile } from "../components";
import { TileComponent } from "./tile";
import { PlayerState } from "./game_state";
import { PlayerHands } from "../hands.js";

export interface HandsFieldProps {
  hands: PlayerHands;
  isMyTurn: boolean;
  updatePlayerState?: (state: PlayerState) => void;
}

export class HandsFieldComponent extends React.Component<
  HandsFieldProps,
  PlayerState
> {
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
    const isMyField = this.props.updatePlayerState != null
    if (this.props.isMyTurn && isMyField) {
      clickHandler = (tile: Tile) => this.onClick(tile);
      handClasses.push(style.pickable);
    }

    const pickedTile = this.state.pickedTile;
    const tileItems = this.props.hands.tiles.map((tile, i) => {
      const classes =
        pickedTile === tile ? [...handClasses, style.picked] : handClasses;
      return (
        <div
          className={classes.join(" ")}
          key={`${isMyField ? "me" : "other"}:${i}`}
          onClick={() => clickHandler(tile)}
        >
          <TileComponent tile={tile} />
        </div>
      );
    });

    return <div className={style.field}>{tileItems}</div>;
  }
}
