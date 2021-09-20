import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "@redux/hooks/useAppSelector";
import { View } from "@redux/modules/view";
import React, { FC } from "react";

export type ProgressBarProps = {
  action?: View["action"];
};

export const ProgressBar: FC<ProgressBarProps> = ({
  action: overrideAction,
}) => {
  const action = useAppSelector((state) => overrideAction || state.view.action);

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
