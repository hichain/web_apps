import { Facebook, Sms, Twitter } from "@mui/icons-material";
import { Divider, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { externalLinks } from "@routes";
import { strings } from "@strings";
import dayjs from "dayjs";
import React, { FC } from "react";
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
} from "react-share";

const SocialButtons: FC = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
    >
      <Grid item>
        <TwitterShareButton
          url={document.URL}
          title={document.title}
          via={strings.app.twitter}
          related={[strings.app.twitter]}
        >
          <Twitter />
        </TwitterShareButton>
      </Grid>
      <Grid item>
        <FacebookShareButton url={document.URL}>
          <Facebook />
        </FacebookShareButton>
      </Grid>
      <Grid item>
        <LineShareButton url={document.URL} title={document.title}>
          <Sms />
        </LineShareButton>
      </Grid>
    </Grid>
  );
};

export const Footer: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 4,
      }}
    >
      <Divider sx={{ width: "95%" }} />
      <SocialButtons />
      <Typography variant="subtitle2" sx={{ marginY: 2 }}>
        <span>© {dayjs().format("YYYY")} </span>
        <Link href={externalLinks.top} target="_blank">
          {strings.app.organization}
        </Link>
      </Typography>
    </Box>
  );
};
