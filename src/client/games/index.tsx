import { Slashchain, SupportedGame } from "@/games";
import { images } from "@images";
import {
  Avatar,
  Box,
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
  Paper,
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

const gameStrings = (game: SupportedGame) => strings.games[game];

const GameListComponent: FC<GameListComponentProps> = ({ className }) => {
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
    <Box className={className}>
      <CardMedia
        image={images.appLogo}
        sx={{ height: 160, marginY: 8, backgroundSize: "contain" }}
      />
      <Typography variant="h4" align="center">
        {strings.gameList.games}
      </Typography>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center", marginY: 4 }}
      >
        {gameList.length === 0 && (
          <Typography variant="body1" align="center">
            {strings.gameList.noGames}
          </Typography>
        )}
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
                {gameStrings(game).name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                whiteSpace="pre-line"
              >
                {gameStrings(game).description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" href={routes.game(game)}>
                {strings.common.play}
              </Button>
              <Button
                size="small"
                href={externalLinks.games[game]}
                target="_blank"
              >
                {strings.common.learnMore}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Container>
      <Container maxWidth="sm" sx={{ marginY: 8 }}>
        <Typography variant="h4" align="center">
          {strings.gameList.recentlyPlayedMatches}
        </Typography>
        <Box sx={{ marginY: 2 }}>
          {sortedMatchList.length === 0 && (
            <Typography variant="body1" align="center">
              {strings.gameList.noMatches}
            </Typography>
          )}
          {sortedMatchList.length > 0 && (
            <Paper>
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
                        primary={gameStrings(match.gameName).name}
                        secondary={dayjs(match.createdAt).format(
                          "YYYY/MM/DD HH:mm"
                        )}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Container>
    </Box>
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
