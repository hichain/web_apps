import { envs } from "@/envs";
import { images } from "@images";
import { Info } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  Popover,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { routes } from "@routes";
import { strings } from "@strings";
import React, { FC, useCallback, useRef, useState } from "react";
import { useHistory } from "react-router";

const version = envs?.version ?? "";

const InfoButton: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="info"
        aria-describedby="info-button"
        color="inherit"
        ref={ref}
        onClick={handleClick}
      >
        <Info />
      </IconButton>
      <Popover
        id={"info-button"}
        open={open}
        anchorEl={ref.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ paddingX: 2, paddingY: 1 }}>{version}</Box>
      </Popover>
    </>
  );
};

const HideOnScroll: FC<{ children: React.ReactElement }> = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export const Header: FC = () => {
  const history = useHistory();

  const toRootPage = useCallback(() => history.push(routes.root), [history]);

  return (
    <HideOnScroll>
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="app-icon"
            onClick={toRootPage}
          >
            <Icon fontSize="large">
              <img src={images.appIcon} alt="app-icon" />
            </Icon>
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              sx={{ color: "inherit", fontSize: "h6.fontSize" }}
              onClick={toRootPage}
            >
              {strings.app.title}
            </Button>
          </Box>
          <InfoButton />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};
