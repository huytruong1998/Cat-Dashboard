import { BreedElement } from "components/dashboard/modals/breeds";
import { createContext, useReducer } from "react";
import { dashBoardReducer } from "./DashBaordReducer";

export interface getCatVariable {
  page: number;
  limit: number;
  order: string;
  sort: string;
  search: string;
}

export interface DashBoardState {
  variables: getCatVariable;
  displayList: BreedElement[];
}

interface DashBoardProviderProps {
  children: JSX.Element | JSX.Element[];
}

const initialState = {
  variables: {
    page: 1,
    limit: 10,
    order: "desc",
    sort: "created_at",
    search: "",
  },
  displayList: [],
};

export type DashBoardContextProps = {
  dashboardState: DashBoardState;
  updateList: (payload: BreedElement[]) => void;
  updateVariables: (payload: getCatVariable) => void;
};

export const DashBoardContext = createContext<DashBoardContextProps>(
  {} as DashBoardContextProps
);

export const DashBoardProvider = ({ children }: DashBoardProviderProps) => {
  const [dashboardState, displatch] = useReducer(
    dashBoardReducer,
    initialState
  );

  const updateList = (payload: BreedElement[]) => {
    displatch({ type: "updateList", payload });
  };

  const updateVariables = (payload: getCatVariable) => {
    displatch({ type: "updateVariables", payload });
  };

  return (
    <DashBoardContext.Provider
      value={{ dashboardState, updateList, updateVariables }}
    >
      {children}
    </DashBoardContext.Provider>
  );
};
