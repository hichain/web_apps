import { useAppDispatch } from "@redux/hooks/useAppDispatch";
import { useAppSelector } from "@redux/hooks/useAppSelector";
import {
  TransitionCloseHandler,
  TransitionHandler,
  useSnackbar,
} from "notistack";
import { FC, useCallback, useEffect } from "react";

export const SnackbarComponent: FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notifications);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onClose: TransitionCloseHandler = useCallback(
    (_event, _reason, closedKey) => {
      dispatch(({ notifications }) =>
        closedKey != null
          ? notifications.close({ key: closedKey.toString() })
          : notifications.closeAll()
      );
    },
    [dispatch]
  );

  const onExited: TransitionHandler = useCallback(
    (_event, exitedKey) => {
      dispatch(({ notifications }) =>
        notifications.remove({ key: exitedKey.toString() })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    notifications.forEach(({ key, message, dismissed, variant }) => {
      if (dismissed) {
        closeSnackbar(key);
        return;
      }

      enqueueSnackbar(message, {
        key,
        variant,
        onClose,
        onExited,
      });
    });
  }, [closeSnackbar, enqueueSnackbar, notifications, onClose, onExited]);

  return null;
};
