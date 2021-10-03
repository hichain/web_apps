import { Divider, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { externalLinks } from "@routes";
import { strings } from "@strings";
import dayjs from "dayjs";
import React, { FC } from "react";

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
      <Typography variant="subtitle2" sx={{ marginY: 2 }}>
        <span>© {dayjs().format("YYYY")} </span>
        <Link href={externalLinks.top} target="_blank">
          {strings.app.organization}
        </Link>
      </Typography>
    </Box>
  );
};
