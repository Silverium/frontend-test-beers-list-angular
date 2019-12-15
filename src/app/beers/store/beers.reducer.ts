import { BeersState } from "./beers.state-type";
import { FETCH_BEERS_RESPONSE, FETCH_BEER_RESPONSE } from "./beers.actions";
import { GenericAction } from "../../models";

const initialState: BeersState = {
  beers: [],
  beer: null
};

export const beersReducer = (state = initialState, action: GenericAction) => {
  switch (action.type) {
    case FETCH_BEERS_RESPONSE: {
      return <BeersState>{ ...state, beers: action.payload };
    }
    case FETCH_BEER_RESPONSE: {
      return <BeersState>{ ...state, beer: action.payload[0] };
    }

    default:
      return state;
  };
};
