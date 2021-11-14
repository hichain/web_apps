import { getAngle, Tile, toRotatedTile } from "@games";
import { images } from "@images";
import { Box } from "@mui/system";
import React, { FC } from "react";

const tileImages = images.games.slashchain.tiles;

type TileComponentProps = {
  className?: string;
  children?: never;
  tile: Tile;
  angle: number;
};

export const TileComponent: FC<TileComponentProps> = ({
  className,
  tile,
  angle,
}) => {
  const rotatedTile = toRotatedTile(tile);
  const { tile: defaultRotatedTile, angle: initialAngle } =
    getAngle(rotatedTile);
  const imageUrl = tileImages[defaultRotatedTile];
  const name = `${rotatedTile}:${angle}`;

  return (
    <Box
      className={className}
      sx={{
        fontSize: "1.2rem",
        wordBreak: "break-all",
        transform: `rotate(${90 * (angle + initialAngle)}deg)`,
        transformOrigin: "center",
        height: "inherit",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      {imageUrl == null ? `No Image (${name})` : ""}
    </Box>
  );
};
