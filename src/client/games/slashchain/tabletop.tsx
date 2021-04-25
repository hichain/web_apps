import React, {
  createContext,
  FC,
  useCallback,
  useMemo,
  useState,
} from "react";
import { BoardComponent } from "./board";
import {
  GameState,
  Moves,
  TileBoard,
  Cell,
  NamedPlayer,
  playOrder,
  HandTiles,
  reverse,
} from "@games";
import { MyFieldComponent, PickedHand } from "./my_field";
import { BoardProps } from "boardgame.io/dist/types/src/client/react";
import styled from "styled-components";
import { OtherFieldComponent } from "./other_field";
import { Ctx } from "boardgame.io";

export const GameContext = createContext<
  | (Ctx & {
      player: NamedPlayer;
      isMyTurn: boolean;
    })
  | undefined
>(undefined);

type ContainerProps = BoardProps<GameState> & {
  className?: string;
  children?: never;
  moves: Moves;
};

type PresenterProps = {
  className?: string;
  player: NamedPlayer;
  board: TileBoard;
  hands: HandTiles;
  pickedTileIndex?: number;
  moves?: {
    pickTile: React.Dispatch<React.SetStateAction<PickedHand | undefined>>;
    putTile: (cell: Cell) => void;
  };
  gameResult: string;
};

const DomComponent: FC<PresenterProps> = ({
  className,
  player,
  board,
  hands,
  pickedTileIndex,
  moves,
  gameResult,
}) => (
  <div className={className}>
    <OtherFieldComponent
      className="hands other"
      hands={hands[reverse(player)]}
      player={reverse(player)}
    />
    <BoardComponent
      className="board"
      selectCell={moves?.putTile}
      board={board}
    />
    <MyFieldComponent
      className="hands me"
      hands={hands[player]}
      player={player}
      pickedTileIndex={pickedTileIndex}
      pickTile={moves?.pickTile}
    />
    <div id="winner">{gameResult}</div>
  </div>
);

const StyledComponent = styled(DomComponent)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  padding: 4rem 0;
  margin: 0 auto;

  & > .board {
    width: 100%;
    height: 70%;
    margin: 1rem 0;
  }

  & > .hands {
    width: 90%;
    margin: 0 auto;
  }
`;

export const TabletopComponent: React.FC<ContainerProps> = (props) => {
  const [pickedTile, pickTile] = useState<PickedHand | undefined>();

  const player = playOrder[props.ctx.playOrderPos];
  const isMyTurn = props.ctx.currentPlayer === props.playerID;

  const gameResult = useMemo(() => {
    if (!props.ctx.gameover) {
      return "";
    }
    if (props.ctx.gameover.winner !== undefined) {
      return `Winner: ${props.ctx.gameover.winner}`;
    } else {
      return "Draw!";
    }
  }, [props.ctx.gameover]);

  const board = useMemo(() => new TileBoard(props.G.board), [props.G.board]);
  const hands = props.G.hands;

  const putTile = useCallback(
    (cell: Cell) => {
      if (pickedTile == null) {
        return;
      }
      props.moves.clickCell(cell.x, cell.y, pickedTile.index, pickedTile.angle);
      props.events.endTurn?.();
      pickTile(undefined);
    },
    [pickedTile, props.events, props.moves]
  );

  const moves = isMyTurn
    ? {
        pickTile,
        putTile,
      }
    : undefined;

  return (
    <GameContext.Provider value={{ ...props.ctx, player, isMyTurn }}>
      <StyledComponent
        {...{
          className: props.className,
          player,
          board,
          hands,
          pickedTileIndex: pickedTile?.index,
          moves,
          gameResult,
        }}
      />
    </GameContext.Provider>
  );
};
