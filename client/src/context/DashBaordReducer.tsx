import { BreedElement } from "components/dashboard/modals/breeds";
import { DashBoardState, getCatVariable } from "./DashBoardContext";

type DashBoardAction =
  | { type: "updateList"; payload: BreedElement[] }
  | { type: "updateVariables"; payload: getCatVariable };

export const dashBoardReducer = (
  state: DashBoardState,
  action: DashBoardAction
): DashBoardState => {
  switch (action.type) {
    case "updateList":
      return {
        ...state,
        displayList: action.payload,
      };
    case "updateVariables":
      return {
        ...state,
        variables: action.payload,
      };
    default:
      return state;
  }
};
