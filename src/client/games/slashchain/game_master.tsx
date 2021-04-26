import React, { FC, ReactNode, useContext, useEffect, useMemo } from "react";
import { GameState, HandTiles, playOrder as players, TileBoard } from "@/games";
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
    }
  }, [dispatch, playerState, props.events, props.moves]);

  const game = useMemo(() => {
    const playOrder = props.ctx.playOrder.findIndex(
      (playerID) => playerID === props.playerID
    );
    if (playOrder === -1) {
      return undefined;
    }
    return {
      player: players[playOrder],
      isMyTurn: props.ctx.currentPlayer === props.playerID,
    };
  }, [props.ctx.currentPlayer, props.ctx.playOrder, props.playerID]);

  useEffect(() => {
    if (game?.isMyTurn) {
      dispatch?.({ type: "pick_tile", payload: { index: 0, angle: 0 } });
    } else {
      dispatch?.({ type: "reset" });
    }
  }, [dispatch, game?.isMyTurn]);

  return (
    <GameContext.Provider value={game}>
      {game && props.children(game, board, props.G.hands)}
    </GameContext.Provider>
  );
};
