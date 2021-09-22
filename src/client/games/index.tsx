import { Slashchain, SupportedGame } from "@/games";
import { images } from "@images";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { externalLinks, routes } from "@routes";
import { strings } from "@strings";
import dayjs from "dayjs";
import _ from "lodash";
import React, { FC, useCallback, useMemo } from "react";
import { useHistory } from "react-router";
import { GameTopComponent } from "./game";
import { GameMatchComponent } from "./game/match";
import { useGameList } from "./hooks/useGameList";
import { usePlayingMatchList } from "./hooks/usePlayingMatchList";
import { SlashchainClient } from "./slashchain";

type GameListComponentProps = {
  children?: never;
  className?: string;
};

const gameName = (game: SupportedGame) => strings.games[game] ?? "Unknown Game";

const GameListComponent: FC<GameListComponentProps> = (props) => {
  const history = useHistory();
  const gameList = useGameList();
  const playingMatchList = usePlayingMatchList();

  const sortedMatchList = useMemo(
    () => _.reverse(_.sortBy(playingMatchList, (match) => match.createdAt)),
    [playingMatchList]
  );

  const playMatch = useCallback(
    (game: SupportedGame, matchID: string) => {
      history.push(routes.match(game, matchID));
    },
    [history]
  );

  return (
    <div>
      <CardMedia
        image={images.appLogo}
        sx={{ height: 160, marginY: 8, backgroundSize: "contain" }}
      />
      <Container maxWidth="lg" sx={{ marginY: 8 }}>
        {gameList.map((game) => (
          <Card sx={{ maxWidth: 350 }} key={game}>
            <CardMedia
              component="img"
              height="350"
              image={images.games[game].artwork}
              alt={game}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {gameName(game)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" href={routes.game(game)}>
                Play
              </Button>
              <Button
                size="small"
                href={externalLinks.games[game]}
                target="_blank"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Container>
      <Container maxWidth="md" sx={{ marginY: 8 }}>
        <Typography variant="h4" align="center">
          {strings.titles.recentlyPlayedMatches}
        </Typography>
        <List>
          {sortedMatchList.map((match) => (
            <ListItem key={match.matchID}>
              <ListItemButton
                onClick={() => playMatch(match.gameName, match.matchID)}
              >
                <ListItemAvatar>
                  <Avatar
                    src={images.games[match.gameName].icon}
                    variant="square"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={gameName(match.gameName)}
                  secondary={dayjs(match.createdAt).format("YYYY/MM/DD HH:mm")}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export const gameComponents = {
  list: GameListComponent,
  top: GameTopComponent,
  match: GameMatchComponent,
  games: {
    slashchain: {
      game: Slashchain,
      board: SlashchainClient,
    },
  },
} as const;
