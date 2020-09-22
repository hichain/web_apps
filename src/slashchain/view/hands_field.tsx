import React from "react";
import style from "../styles/field.module.scss";
import { TileComponent } from "./tile";
import { Tile } from "../components";
import { Hand } from "./game_state";

export interface HandsProps {
  hands: Tile[];
  playerID: string;
  pickedTile?: Hand;
}

export interface PickableHandsProps extends HandsProps {
  pick: (index: number) => void;
  rotate: (index: number, dir: number) => void;
}

const tileItem = (
  classes: string[],
  key: string,
  tile: Tile,
  onClick?: () => void
): JSX.Element => {
  return (
    <div className={classes.join(" ")} key={key} onClick={onClick}>
      <TileComponent tile={tile} />
    </div>
  );
};

export const HandsComponent = (props: HandsProps): JSX.Element => {
  const tileItems = props.hands.map((tile, i) =>
    tileItem([style.tile], `${props.playerID}:${i}`, tile)
  );

  return <div className={style.field}>{tileItems}</div>;
};

export const PickableHandsComponent = (
  props: PickableHandsProps
): JSX.Element => {
  const handClasses = [style.tile, style.pickable];
  const tileItems = props.hands.map((tile, i) => {
    if (props.pickedTile?.index === i) {
      return (
        <div
          className={[...handClasses, style.picked].join(" ")}
          key={`${props.playerID}:${i}`}
          onClick={(): void => props.rotate(i, 1)}
        >
          <TileComponent tile={tile} dir={props.pickedTile.dir} />
        </div>
      );
    } else {
      return tileItem(handClasses, `${props.playerID}:${i}`, tile, () =>
        props.pick(i)
      );
    }
  });
  return <div className={style.field}>{tileItems}</div>;
};
