import slash from "./slash.svg";
import backslash from "./backslash.svg";
import arrowUpwards from "./arrow_upwards.svg";
import parallelSlash from "./parallel_slash.svg";
import pinUpperLeft from "./pin_upper-left.svg";
import powerUpperLeft from "./power_upper-left.svg";
import cross from "./cross.svg";
import square from "./square.svg";
import artwork from "./artwork.png";
import icon from "./icon.svg";

export const tiles = {
  arrowUpwards,
  parallelSlash,
  pinUpperLeft,
  powerUpperLeft,
  cross,
  square,
} as const;

export const slashchain = {
  players: {
    slash,
    backslash,
  },
  tiles,
  artwork,
  icon,
} as const;
