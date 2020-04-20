import { BeersState } from "./beers.state-type";
import { FETCH_BEERS_RESPONSE, FETCH_BEER_RESPONSE, FETCH_BEER_REQUEST, FETCH_BEERS_REQUEST, FETCH_BEERS_INFINITE_RESPONSE, CLEAR_BEERS_LIST } from "./beers.actions";
import { GenericAction } from "../../models";

const initialState: BeersState = {
  beers: [],
  beer: null
};
const LAST_BEER = 'lastBeer';
const LAST_BEERS_LIST = 'lastBeersList';
const LAST_BEERS_QUERY = 'lastBeersQuery';

export function beersReducer(state = initialState, action: GenericAction) {
  switch (action.type) {
    case FETCH_BEERS_RESPONSE: {
      const beers = action.payload;
      try {
        localStorage.setItem(LAST_BEERS_LIST, JSON.stringify(beers));
      } catch (error) {
        console.info('%cvariable: error trying to save lastBeersList', 'background-color: lime;', error);
      }

      return <BeersState>{ ...state, beers };
    }
    case FETCH_BEERS_INFINITE_RESPONSE: {
      const beers = action.payload;
      try {
        localStorage.setItem(LAST_BEERS_LIST, JSON.stringify(beers));
      } catch (error) {
        console.info('%cvariable: error trying to save lastBeersList', 'background-color: lime;', error);
      }

      return <BeersState>{ ...state, beers: [...state.beers, ...beers] };
    }
    case FETCH_BEERS_REQUEST: {
      try {
        const newQuery = JSON.stringify(action.payload);
        const lastQuery = localStorage.getItem(LAST_BEERS_QUERY);

        localStorage.setItem(LAST_BEERS_QUERY, newQuery);
        if (newQuery == lastQuery) {
          const beers = JSON.parse(localStorage.getItem(LAST_BEERS_LIST));
          // I assume here that localStorage is faster than network (I should make sure with timestamps)
          return <BeersState>{ ...state, beers };
        }
      } catch (error) {
        console.info(`%ccould not get last Beers list from localStorage`, 'background-color: gold;');

        return state
      }
    }
    
    case CLEAR_BEERS_LIST: {
      return <BeersState>{ ...state, beers: [] };
    }

    case FETCH_BEER_RESPONSE: {
      const beer = action.payload[0];
      localStorage.setItem(LAST_BEER, JSON.stringify(beer))

      return <BeersState>{ ...state, beer };
    }
    case FETCH_BEER_REQUEST: {
      try {
        const id = action.payload;
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
