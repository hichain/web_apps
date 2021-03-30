import React from "react";
import style from "../styles/field.module.scss";
import { TileComponent } from "./tile";
import { Tile } from "../tile";
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

const TileItem: React.FC<{
  classes: string[];
  key: string;
  tile: Tile;
  onClick?: () => void;
}> = ({ classes, key, tile, onClick }) => {
  return (
    <div className={classes.join(" ")} key={key} onClick={onClick}>
      <TileComponent tile={tile} />
    </div>
  );
};

export const HandsComponent: React.FC<HandsProps> = ({ hands, playerID }) => {
  const tileItems = hands.map((tile, i) =>
    TileItem({ classes: [style.tile], key: `${playerID}:${i}`, tile })
  );

  return <div className={style.field}>{tileItems}</div>;
};

export const PickableHandsComponent: React.FC<PickableHandsProps> = ({
  hands,
  playerID,
  pickedTile,
  rotate,
  pick,
}) => {
  const handClasses = [style.tile, style.pickable];
  const tileItems = hands.map((tile, i) => {
    if (pickedTile?.index === i) {
      return (
        <div
          className={[...handClasses, style.picked].join(" ")}
          key={`${playerID}:${i}`}
          onClick={(): void => rotate(i, 1)}
        >
          <TileComponent tile={tile} dir={pickedTile.dir} />
        </div>
      );
    } else {
      return TileItem({
        classes: handClasses,
        key: `${playerID}:${i}`,
        tile,
        onClick: () => pick(i),
      });
    }
  });
  return <div className={style.field}>{tileItems}</div>;
};
