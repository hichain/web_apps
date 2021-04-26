import React, { FC, ReactNode, useContext, useEffect, useMemo } from "react";
import { GameState, HandTiles, playOrder, TileBoard } from "@/games";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { PlayerContext } from "@contexts/player";
import { GameContext, GameContextState } from "@contexts/game";

type Props = BoardProps<GameState> & {
  children: (
    game: GameContextState,
    board: TileBoard,
    hands: HandTiles
  ) => ReactNode;
};

export const GameMasterComponent: FC<Props> = (props) => {
  const { state: playerState, dispatch } = useContext(PlayerContext);
  const board = useMemo(() => new TileBoard(props.G.board), [props.G.board]);

  useEffect(() => {
    const { pickedTile, selectedCell } = playerState;
    if (pickedTile && selectedCell) {
      props.moves.clickCell(
        selectedCell.x,
        selectedCell.y,
        pickedTile.index,
        pickedTile.angle
      );
      props.events.endTurn?.();
      dispatch?.({ type: "reset" });
    }
  }, [dispatch, playerState, props.events, props.moves]);

  const game: GameContextState = {
    player: playOrder[props.ctx.playOrderPos],
    isMyTurn: props.ctx.currentPlayer === props.playerID,
  };

  return (
    <GameContext.Provider value={game}>
      {props.children(game, board, props.G.hands)}
    </GameContext.Provider>
  );
};
