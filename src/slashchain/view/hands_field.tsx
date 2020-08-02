import React from "react";
import style from "../styles/field.module.scss";
import { TileComponent } from "./tile";
import { PlayerState } from "./game_state";
import { Tile } from "../components";

export interface HandsFieldProps extends PlayerState {
  hands: Tile[];
  isMyTurn: boolean;
  pick?: (index: number) => void;
  rotate?: (dir: number) => void;
}

export class HandsFieldComponent extends React.Component<HandsFieldProps> {
  constructor(props: HandsFieldProps) {
    super(props);
    this.state = {
      pickedTile: undefined,
    };
  }

  onClick(index: number) {
    if (this.props.pickedTile?.index === index) {
      this.props.rotate?.((this.props.pickedTile.rotate ?? 0) + 1);
    } else {
      this.props.pick?.(index);
    }
  }

  render() {
    const handClasses = [style.tile];
    let clickHandler: (index: number) => void;
    const isMyField = this.props.pick != null;
    if (this.props.isMyTurn && isMyField) {
      clickHandler = (index) => this.onClick(index);
      handClasses.push(style.pickable);
    }

    const pickedTile = this.props.pickedTile;
    const tileItems = this.props.hands.map((tile, i) => {
      const key = `${isMyField ? "me" : "other"}:${i}`;
      if (pickedTile?.index === i) {
        return (
          <div
            className={[...handClasses, style.picked].join(" ")}
            key={key}
            onClick={() => clickHandler(i)}
          >
            <TileComponent tile={tile} dir={pickedTile.rotate} />
          </div>
        );
      } else {
        return (
          <div
            className={handClasses.join(" ")}
            key={key}
            onClick={() => clickHandler(i)}
          >
            <TileComponent tile={tile} />
          </div>
        );
      }
    });

    return <div className={style.field}>{tileItems}</div>;
  }
}
