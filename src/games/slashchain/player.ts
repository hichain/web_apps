export type NamedPlayer = "slash" | "backslash";

// slash: first move
export const playOrder = ["slash", "backslash"] as const;

export const reverse = (player: NamedPlayer): NamedPlayer =>
  player === "slash" ? "backslash" : "slash";
