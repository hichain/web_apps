import React from "react";
import { PlayerID } from "boardgame.io";
import { GameState } from "./game_state";
import style from "../css/component.module.scss";

export interface HandsFieldProps {
  G: GameState;
  playerID: PlayerID;
  isMine: boolean;
}

export class HandsFieldComponent extends React.Component<HandsFieldProps> {
  private gameState = this.props.G;

  onClick(index: number) {
		this.gameState.pickedTileIndex = index;
  }

  render() {
		let clickHandler: (i: number) => void = () => {};
		if (this.props.isMine) {
			clickHandler = (i: number) => this.onClick(i)
		}
    const tileItems = this.gameState.hands[this.props.playerID].tiles.map(
      (tile, i) => (
        <p className={style.tile} key={`${this.props.playerID}:${i}`} onClick={() => clickHandler(i)}>
          {tile.name}
        </p>
      )
    );

    return <div className={style.field}>{tileItems}</div>;
  }
}
