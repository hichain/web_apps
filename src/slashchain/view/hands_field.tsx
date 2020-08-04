import React from "react";
import style from "../styles/field.module.scss";
import { TileComponent } from "./tile";
import { PlayerState } from "./game_state";
import { Tile } from "../components";

export interface HandsProps extends PlayerState {
  hands: Tile[];
  playerID: string;
}

export interface PickableHandsProps extends HandsProps {
  pick: (index: number) => void;
  rotate: (dir: number) => void;
}

const TileItem = (
  classes: string[],
  key: string,
  tile: Tile,
  onClick?: () => void
) => {
  return (
    <div className={classes.join(" ")} key={key} onClick={onClick}>
      <TileComponent tile={tile} />
    </div>
  );
};

export const HandsComponent = (props: HandsProps) => {
  const tileItems = props.hands.map((tile, i) =>
    TileItem([style.tile], `${props.playerID}:${i}`, tile)
  );

  return <div className={style.field}>{tileItems}</div>;
};

export const PickableHandsComponent = (props: PickableHandsProps) => {
  const handClasses = [style.tile, style.pickable];
  const tileItems = props.hands.map((tile, i) => {
    if (props.pickedTile?.index === i) {
      return (
        <div
          className={[...handClasses, style.picked].join(" ")}
          key={`${props.playerID}:${i}`}
          onClick={() => props.rotate((props.pickedTile?.rotate ?? 0) + 1)}
        >
          <TileComponent tile={tile} dir={props.pickedTile.rotate} />
        </div>
      );
    } else {
      return TileItem(handClasses, `${props.playerID}:${i}`, tile, () =>
        props.pick(i)
      );
    }
  });
  return <div className={style.field}>{tileItems}</div>;
};
