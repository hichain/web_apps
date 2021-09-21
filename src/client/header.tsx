import { imageComponents } from "@images";
import { Info } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { strings } from "@strings";
import React, { FC } from "react";

const { AppIcon } = imageComponents;

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
          <IconButton size="large" edge="end" aria-label="info" color="inherit">
            <Info />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
