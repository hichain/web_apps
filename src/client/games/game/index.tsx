import { Slashchain } from "@/games";
import { useAppDispatch } from "@redux/hooks/useAppDispatch";
import { useAppSelector } from "@redux/hooks/useAppSelector";
import { SupportedGame } from "@games";
import { routes } from "@routes";
import React, { FC, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

type ContainerProps = {
  children?: never;
  gameName: SupportedGame;
};

const StyledComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  font-size: 2.4rem;
  transform: translate(-50%, -50%);
`;

export const GameTopComponent: FC<ContainerProps> = ({ gameName }) => {
  const dispatch = useAppDispatch();
  const createdMatchID = useAppSelector((state) => state.match.matchID);
  const history = useHistory();

  useEffect(() => {
    if (createdMatchID == null) {
      dispatch(({ lobby }) =>
        lobby.createMatch({
          gameName,
          numPlayers: Slashchain.maxPlayers,
        })
      );
    } else {
      history.replace(routes.match(gameName, createdMatchID));
    }
  }, [createdMatchID, dispatch, gameName, history]);

  return <StyledComponent>Creating a match...</StyledComponent>;
};
