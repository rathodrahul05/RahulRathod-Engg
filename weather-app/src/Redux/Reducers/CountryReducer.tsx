import { AppActions } from "../../types/actions";
import { CountryInfo } from "../../types/CountryInfo";

const initialState: CountryInfo[] = [];

const CountryReducer = (state = initialState, action: AppActions) => {
  switch (action.type) {
    case "FETCH_COUNTRY":
      return action.country;

    default:
      return state;
  }
};
export default CountryReducer;
