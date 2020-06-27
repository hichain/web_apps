import React from "react";
import { PlayerID } from "boardgame.io";
import { Tile } from "../components";
import { GameState } from "./game_state";
import style from "../css/component.module.scss";

export interface HandsFieldProps {
  G: GameState;
  playerID: PlayerID;
  isMine: boolean;
}

export class HandsFieldComponent extends React.Component<HandsFieldProps> {
  private gameState = this.props.G;

  onClick(tile: Tile, index: number) {
		this.gameState.pickedTile = tile;
		this.gameState.hands[this.props.playerID].pick(index);
  }

  render() {
		let clickHandler: (tile: Tile, i: number) => void = () => {};
		if (this.props.isMine) {
			clickHandler = (tile: Tile, i: number) => this.onClick(tile, i)
		}
    const tileItems = this.gameState.hands[this.props.playerID].tiles.map(
      (tile, i) => (
        <p className={style.tile} key={`${this.props.playerID}:${i}`} onClick={() => clickHandler(tile, i)}>
          {tile.name}
        </p>
      )
    );

    return <div className={style.field}>{tileItems}</div>;
  }
}
