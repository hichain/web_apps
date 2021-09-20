import { useAppDispatch } from "@redux/hooks/useAppDispatch";
import { useAppSelector } from "@redux/hooks/useAppSelector";
import { SnackbarProvider, TransitionHandler, useSnackbar } from "notistack";
import React, { FC, useCallback, useEffect, useRef } from "react";

const Snackbar: FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notifications);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const displayed = useRef<string[]>([]);

  const onExited: TransitionHandler = useCallback(
    (_event, exitedKey) => {
      dispatch(({ notifications }) =>
        notifications.remove({ key: exitedKey.toString() })
      );
      displayed.current = displayed.current.filter((key) => key !== exitedKey);
    },
    [dispatch]
  );

  useEffect(() => {
    notifications.forEach(({ key, message, dismissed, variant }) => {
      if (dismissed) {
        closeSnackbar(key);
        return;
      }

      if (displayed.current.includes(key)) return;

      enqueueSnackbar(message, {
        key,
        variant,
        onExited,
      });

      displayed.current.push(key);
    });
  }, [closeSnackbar, enqueueSnackbar, notifications, onExited]);

  return null;
};

const CustomSnackbarProvider: FC = ({ children }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {children}
      <Snackbar />
    </SnackbarProvider>
  );
};

export { CustomSnackbarProvider as SnackbarProvider };
