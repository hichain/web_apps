import { SupportedGame } from "@games";
import { useMatchHistory } from "@hooks/useMatchHistory";
import { joinMatch } from "@redux/sagas/lobby";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SlashchainClient } from "../slashchain";

type ContainerProps = {
  children?: never;
  className?: string;
  gameName: SupportedGame;
  matchID: string;
};

type PresenterProps = {
  playerID?: string;
  credentials?: string;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  gameName,
  matchID,
  playerID,
  credentials,
}) => {
  const Client = (() => {
    switch (gameName) {
      case "slashchain":
        return SlashchainClient;
    }
  })();
  return (
    <div className={className}>
      <Client matchID={matchID} playerID={playerID} credentials={credentials} />
    </div>
  );
};

export const GameMatchComponent: FC<ContainerProps> = (props) => {
  const { gameName, matchID } = props;
  const dispatch = useDispatch();
  const match = useMatchHistory(gameName, matchID);

  useEffect(() => {
    if (!match) {
      dispatch(joinMatch({ gameName, matchID }));
    }
  }, [dispatch, gameName, match, matchID]);

  return (
    <DomComponent
      {...props}
      playerID={match?.playerID}
      credentials={match?.credentials}
    />
  );
};
