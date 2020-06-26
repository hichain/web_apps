import React from "react";
import { PlayerID } from "boardgame.io";
import { Tile } from "../components";
import { GameState } from "./game_state";

export interface HandsFieldProps {
  G: GameState;
}

export class HandsFieldComponent extends React.Component<
  HandsFieldProps,
  PlayerID
> {
  private gameState = this.props.G;

  onClick(tile: Tile) {
    this.gameState.pickedTile = tile;
  }

  render() {
    const fieldStyle: { [key: string]: string } = {
      display: "flex",
      "flex-wrap": "wrap",
      "justify-content": "space-between",
      "align-items": "center",
    };
    const tileStyle: { [key: string]: string } = {
      width: "50px",
      height: "50px",
      "object-fit": "contain",
    };

    const tileItems = this.gameState.hands[this.state].tiles.map((tile) => (
      <p style={tileStyle} onClick={() => this.onClick(tile)}>
        {tile.name}
      </p>
    ));

    return (
      <div id="field" style={fieldStyle}>
        {tileItems}
      </div>
    );
  }
}
