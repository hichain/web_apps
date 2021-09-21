import { envs } from "@/envs";
import { imageComponents } from "@images";
import { Info } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Popover,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { strings } from "@strings";
import React, { FC, useCallback, useRef, useState } from "react";

const { AppIcon } = imageComponents;

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

export const Header: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="app-icon"
          >
            <SvgIcon fontSize="large">
              <AppIcon />
            </SvgIcon>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {strings.app.title}
          </Typography>
          <InfoButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
