import React from "react";
import style from "../styles/field.module.scss";
import { NamedTile } from "../components";
import { TileComponent } from "./tile";
import { PlayerState } from "./game_state";

export interface HandsFieldProps {
  hands: NamedTile[];
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

  onClick(tile: NamedTile) {
    if (this.state.pickedTile === tile) {
      this.rotate(1);
    } else {
      this.pick(tile);
    }
  }

  private pick(tile: NamedTile) {
    const state = {
      pickedTile: tile,
    };
    this.props.updatePlayerState?.(state);
    this.setState(state);
  }

  private rotate(number: number) {
    const tile = this.state.pickedTile;
    if (tile == null) {
      return;
    }
    this.setState({
      pickedTile: new NamedTile(tile.name, tile, number),
    });
  }

  render() {
    const handClasses = [style.tile];
    let clickHandler: (tile: NamedTile) => void = () => {};
    const isMyField = this.props.updatePlayerState != null;
    if (this.props.isMyTurn && isMyField) {
      clickHandler = (tile: NamedTile) => this.onClick(tile);
      handClasses.push(style.pickable);
    }

    const pickedTile = this.state.pickedTile;
    const tileItems = this.props.hands.map((tile, i) => {
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
