import {
  GameState,
  HandTiles,
  NamedPlayer,
  playOrder as players,
  TileBoard,
} from "@games";
import { useAppDispatch } from "@redux/hooks/useAppDispatch";
import { useAppSelector } from "@redux/hooks/useAppSelector";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import React, { FC, ReactNode, useEffect, useMemo } from "react";

type Props = BoardProps<GameState> & {
  children: (
    player: NamedPlayer,
    board: TileBoard,
    hands: HandTiles
  ) => ReactNode;
};

// TODO: use Game.playerView instead of this component
export const GameMasterComponent: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { pickedTile, selectedCell } = useAppSelector((state) => state.player);
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
  }, [pickedTile, props.events, props.moves, selectedCell]);

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
    if (game) {
      dispatch(({ match }) =>
        match.startMatch({ player: game.player, isMyTurn: game.isMyTurn })
      );
    }
  }, [dispatch, game]);

  useEffect(() => {
    if (game?.isMyTurn) {
      dispatch(({ player }) => player.pickTile({ index: 0, angle: 0 }));
    } else {
      dispatch(({ player }) => player.reset());
    }
  }, [dispatch, game?.isMyTurn]);

  if (!game) {
    return null;
  }

  return <>{game && props.children(game.player, board, props.G.hands)}</>;
};
