import { Slashchain } from "@/games";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { createMatch } from "@redux/sagas/lobby";
import { routes } from "@routes";
import React, { FC, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

type ContainerProps = {
  children?: never;
};

const StyledComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  font-size: 2.4rem;
  transform: translate(-50%, -50%);
`;

export const GameTopComponent: FC<ContainerProps> = () => {
  const dispatch = useAppDispatch();
  const createdMatchID = useAppSelector((state) => state.match.matchID);
  const history = useHistory();

  useEffect(() => {
    if (createdMatchID == null) {
      dispatch(
        createMatch({
          gameName: "slashchain",
          numPlayers: Slashchain.maxPlayers,
        })
      );
    } else {
      history.replace(routes.games.slashchain.match(createdMatchID));
    }
  }, [createdMatchID, dispatch, history]);

  return <StyledComponent>Creating a match...</StyledComponent>;
};
