import React, { createContext, FC, useReducer, Dispatch } from "react";
import { Cell } from "@/games";

type State = {
  pickedTile?: { index: number; angle: number };
  selectedCell?: Cell;
};

type Action =
  | {
      type: "pick_tile";
      payload: {
        index: number;
        angle: number;
      };
    }
  | {
      type: "rotate_tile";
      payload: {
        angle: number;
      };
    }
  | {
      type: "put_tile";
      payload: {
        cell: Cell;
      };
    }
  | {
      type: "reset";
    };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "pick_tile": {
      return {
        pickedTile: action.payload,
      };
    }
    case "rotate_tile": {
      return {
        ...state,
        pickedTile: state.pickedTile && {
          ...state.pickedTile,
          angle: action.payload.angle,
        },
      };
    }
    case "put_tile": {
      return {
        ...state,
        selectedCell: action.payload.cell,
      };
    }
    case "reset": {
      return {};
    }
  }
};

// TODO: migrate it to redux
export const PlayerContext = createContext<State>({});

export const PlayerDispatherContext = createContext<
  Dispatch<Action> | undefined
>(undefined);

export const PlayerContextProvider: FC<Record<string, unknown>> = (props) => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <PlayerContext.Provider value={state}>
      <PlayerDispatherContext.Provider value={dispatch}>
        {props.children}
      </PlayerDispatherContext.Provider>
    </PlayerContext.Provider>
  );
};
