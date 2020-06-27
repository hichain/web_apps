import React from "react";
import { PlayerID, Ctx } from "boardgame.io";
import { GameState, PlayerState } from "./game_state";
import style from "../css/component.module.scss";
import { Tile } from "../components.js";

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
    let tileClass = [style.tile];
    let clickHandler: (tile: Tile) => void = () => {};
    const isMyTurn = this.props.ctx.currentPlayer === this.props.myPlayerID;
    const isMyField = this.props.myPlayerID === this.props.playerID;
    if (isMyTurn && isMyField) {
      clickHandler = (tile: Tile) => this.onClick(tile);
      tileClass.push(style.pickable);
    }

    const pickedTile = this.state.pickedTile;
    if (!pickedTile) {
      tileClass.push(style["with-animation"]);
    }
    const tileItems = this.gameState.hands[this.props.playerID].tiles.map(
      (tile, i) => {
        const classNames =
          pickedTile === tile ? [...tileClass, style.picked] : tileClass;
        const imageStyle: { [key: string]: string } = {
          transform: `rotate(${90 * tile.rotateCount}deg)`,
        };
        return (
          <img
						className={classNames.join(" ")}
						key={`${this.props.playerID}:${i}`}
            style={imageStyle}
            src={tile.imageUrl}
            alt={tile.name}
            onClick={() => clickHandler(tile)}
          />
        );
      }
    );

    return <div className={style.field}>{tileItems}</div>;
  }
}
