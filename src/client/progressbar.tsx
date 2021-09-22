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
        height: 0,
        overflow: "visible",
      }}
    >
      {action === "running" && <LinearProgress color="secondary" />}
    </Box>
  );
};
