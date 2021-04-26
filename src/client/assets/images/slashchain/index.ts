import slash from "./slash.svg";
import backslash from "./backslash.svg";
import arrowDownwards from "./arrow_downwards.svg";
import arrowLeftwards from "./arrow_leftwards.svg";
import arrowRightwards from "./arrow_rightwards.svg";
import arrowUpwards from "./arrow_upwards.svg";
import parallelSlash from "./parallel_slash.svg";
import parallelBackslash from "./parallel_backslash.svg";
import pinLowerLeft from "./pin_lower-left.svg";
import pinLowerRight from "./pin_lower-right.svg";
import pinUpperLeft from "./pin_upper-left.svg";
import pinUpperRight from "./pin_upper-right.svg";
import powerLowerLeft from "./power_lower-left.svg";
import powerLowerRight from "./power_lower-right.svg";
import powerUpperLeft from "./power_upper-left.svg";
import powerUpperRight from "./power_upper-right.svg";
import cross from "./cross.svg";
import square from "./square.svg";

export const tiles = {
  arrowUpwards,
  arrowRightwards,
  arrowDownwards,
  arrowLeftwards,
  parallelSlash,
  parallelBackslash,
  pinUpperLeft,
  pinUpperRight,
  pinLowerRight,
  pinLowerLeft,
  powerUpperLeft,
  powerUpperRight,
  powerLowerRight,
  powerLowerLeft,
  cross,
  square,
} as const;

export const slashchain = {
  players: {
    slash,
    backslash,
  },
  tiles,
} as const;
