import { BeersState } from "./beers.state-type";
import { FETCH_BEERS_RESPONSE, FETCH_BEER_RESPONSE, FETCH_BEER_REQUEST } from "./beers.actions";
import { GenericAction } from "../../models";

const initialState: BeersState = {
  beers: [],
  beer: null
};
const LAST_BEER = 'lastBeer';


export const beersReducer = (state = initialState, action: GenericAction) => {
  switch (action.type) {
    case FETCH_BEERS_RESPONSE: {
      return <BeersState>{ ...state, beers: action.payload };
    }
    case FETCH_BEER_RESPONSE: {
      const beer = action.payload[0];
      localStorage.setItem(LAST_BEER, JSON.stringify(beer))

      return <BeersState>{ ...state, beer };
    }
    case FETCH_BEER_REQUEST: {
      const id = action.payload;
      try {
        const beer = JSON.parse(localStorage.getItem(LAST_BEER));
        if (beer.id == id) {
          // I assume here that localStorage is faster than network (I should make sure with timestamps)
          return <BeersState>{ ...state, beer };
        }
      } catch (error) {
        console.info(`%ccould not get Beer from localStorage`, 'background-color: gold;');

        return state
      }
    }

    default:
      return state;
  };
};
