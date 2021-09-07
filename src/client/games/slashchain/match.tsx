import { Slashchain } from "@/games";
import { useAppSelector } from "@hooks/useAppSelector";
import { joinMatch } from "@redux/sagas/lobby";
import React, { FC, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Client } from "./client";

type ContainerProps = {
  children?: never;
  className?: string;
  matchID: string;
};

type PresenterProps = {
  playerID?: string;
  credentials?: string;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  matchID,
  playerID,
  credentials,
}) => (
  <div className={className}>
    <Client matchID={matchID} playerID={playerID} credentials={credentials} />
  </div>
);

export const GameMatchComponent: FC<ContainerProps> = ({
  matchID,
  ...props
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const matchHistory = useAppSelector((state) => state.matchHistory);
  const match = useMemo(
    () => matchHistory.find((match) => match.matchID === matchID),
    [matchHistory, matchID]
  );

  useEffect(() => {
    if (!match) {
      dispatch(joinMatch({ gameName: Slashchain.name, matchID }));
    }
  }, [matchHistory, dispatch, history, matchID, match]);

  return (
    <DomComponent
      {...props}
      matchID={matchID}
      playerID={match?.playerID}
      credentials={match?.credentials}
    />
  );
};
