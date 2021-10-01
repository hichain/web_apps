import { CellArray, equals, offset, TileBoard } from "@games";
import { useMemo } from "react";

export const useBoard = (board: TileBoard, isMyTurn: boolean) =>
  useMemo(() => {
    const legalCells = board.legalCells();
    const lastMovedCell = Array.from(board.keys()).pop();
    const range = offset(legalCells.toArray().range(), {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1,
    });
    const cells = CellArray.fromRange(range);
    return {
      cells: cells.map((cell) => ({
        cell,
        tile: board.get(cell),
        isLegal: isMyTurn && legalCells.has(cell),
        isFocused: equals(cell, lastMovedCell),
      })),
      range,
    };
  }, [board, isMyTurn]);
