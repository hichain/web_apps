import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "@redux/hooks/useAppSelector";
import React, { FC } from "react";

export const ProgressBar: FC = () => {
  const action = useAppSelector((state) => state.view.action);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
      }}
    >
      {action === "running" && <LinearProgress />}
    </Box>
  );
};
