import React, { FC, ReactNode, useContext, useEffect, useMemo } from "react";
import { GameState, HandTiles, playOrder as players, TileBoard } from "@/games";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { PlayerContext, PlayerDispatherContext } from "@contexts/player";
import { GameContext, GameContextState } from "@contexts/game";

type Props = BoardProps<GameState> & {
  children: (
    game: GameContextState,
    board: TileBoard,
    hands: HandTiles
  ) => ReactNode;
};

export const GameMasterComponent: FC<Props> = (props) => {
  const { pickedTile, selectedCell } = useContext(PlayerContext);
  const dispatch = useContext(PlayerDispatherContext);
  const board = useMemo(() => new TileBoard(props.G.board), [props.G.board]);

  useEffect(() => {
    if (pickedTile && selectedCell) {
      props.moves.clickCell(
        selectedCell.x,
        selectedCell.y,
        pickedTile.index,
        pickedTile.angle
      );
      props.events.endTurn?.();
    }
  }, [dispatch, pickedTile, props.events, props.moves, selectedCell]);

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

  const children = useMemo(
    () => game && props.children(game, board, props.G.hands),
    [board, game, props]
  );

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
