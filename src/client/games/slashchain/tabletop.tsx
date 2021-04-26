import React, { FC } from "react";
import { BoardComponent } from "./board";
import { GameState, reverse } from "@games";
import { MyFieldComponent } from "./my_field";
import { BoardProps } from "boardgame.io/dist/types/src/client/react";
import styled from "styled-components";
import { OtherFieldComponent } from "./other_field";
import { PlayerContextProvider } from "@contexts/player";
import { GameMasterComponent } from "./game_master";

type Props = BoardProps<GameState> & {
  className?: string;
  children?: never;
};

const DomComponent: FC<Props> = ({ className, ...props }) => (
  <div className={className}>
    <PlayerContextProvider>
      <GameMasterComponent {...props}>
        {({ player }, board, hands) => (
          <>
            <OtherFieldComponent
              className="hands other"
              tiles={hands[reverse(player)]}
              player={reverse(player)}
            />
            <BoardComponent className="board" board={board} />
            <MyFieldComponent
              className="hands me"
              tiles={hands[player]}
              player={player}
            />
          </>
        )}
      </GameMasterComponent>
    </PlayerContextProvider>
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

export const TabletopComponent: React.FC<Props> = (props) => {
  return <StyledComponent {...props} />;
};
