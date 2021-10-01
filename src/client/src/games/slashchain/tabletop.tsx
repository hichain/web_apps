import React, { FC } from "react";
import { BoardComponent } from "./board";
import { GameState, reverse } from "@games";
import { MyFieldComponent } from "./my_field";
import { BoardProps } from "boardgame.io/dist/types/src/client/react";
import styled from "styled-components";
import { OtherFieldComponent } from "./other_field";
import { GameMasterComponent } from "./game_master";
import clsx from "clsx";
import { GameInfoComponent } from "./game_info";

type Props = BoardProps<GameState> & {
  className?: string;
  children?: never;
};

const DomComponent: FC<Props> = ({ className, ...props }) => (
  <div className={className}>
    <GameMasterComponent {...props}>
      {(player, board, hands) => (
        <>
          <OtherFieldComponent
            className={clsx("hands", "other")}
            tiles={hands[reverse(player)]}
            player={reverse(player)}
          />
          <BoardComponent className="board" board={board} />
          <MyFieldComponent
            className={clsx("hands", "me")}
            tiles={hands[player]}
            player={player}
          />
          <GameInfoComponent
            className="game_info"
            events={{ resetGame: props.reset }}
          />
        </>
      )}
    </GameMasterComponent>
  </div>
);

const StyledComponent = styled(DomComponent)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 2rem 0 0 0;
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

  & > .game_info {
    width: 100%;
    margin: 1rem auto 0 auto;
  }
`;

export const TabletopComponent: React.FC<Props> = (props) => {
  return <StyledComponent {...props} />;
};
