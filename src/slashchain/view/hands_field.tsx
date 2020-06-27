import React from "react";
import { PlayerID, Ctx } from "boardgame.io";
import { GameState } from "./game_state";
import style from "../css/component.module.scss";

export interface HandsFieldProps {
  G: GameState;
  playerID: PlayerID;
  ctx: Ctx;
}

export class HandsFieldComponent extends React.Component<HandsFieldProps> {
	private gameState = this.props.G;

  onClick(index: number) {
		this.gameState.pickedTileIndex = index;
  }

  render() {
		let clickHandler: (i: number) => void = () => {};
		const isMyTurn = this.props.ctx.currentPlayer === this.props.ctx.playerID;
		const isMyField = this.props.ctx.playerID === this.props.playerID;
		if (isMyTurn && isMyField) {
      clickHandler = (i: number) => this.onClick(i);
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
