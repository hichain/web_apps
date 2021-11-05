import { SupportedGame } from "@games";
import { useAppDispatch } from "@redux/hooks/useAppDispatch";
import React, { FC, useEffect } from "react";
import { SlashchainClient } from "../slashchain";
import { useAppSelector } from "@redux/hooks/useAppSelector";

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
  const dispatch = useAppDispatch();
  const match = useAppSelector(({ matchHistory }, selector) =>
    selector.matchHistory.find(matchHistory, { gameName, matchID })
  );

  useEffect(() => {
    if (!match) {
      dispatch(({ lobby }) => lobby.joinMatch({ gameName, matchID }));
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
