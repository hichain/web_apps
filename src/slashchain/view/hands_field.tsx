import React from "react";
import { PlayerID } from "boardgame.io";
import { Tile } from "../components";
import { GameState } from "./game_state";
import style from "../css/component.module.scss";

export interface HandsFieldProps {
  G: GameState;
  playerID: PlayerID;
}

export class HandsFieldComponent extends React.Component<HandsFieldProps> {
  private gameState = this.props.G;

  onClick(tile: Tile) {
    this.gameState.pickedTile = tile;
  }

  render() {
    const tileItems = this.gameState.hands[this.props.playerID].tiles.map(
      (tile) => (
        <p className={style.tile} onClick={() => this.onClick(tile)}>
          {tile.name}
        </p>
      )
    );

    return <div className={style.field}>{tileItems}</div>;
  }
}
