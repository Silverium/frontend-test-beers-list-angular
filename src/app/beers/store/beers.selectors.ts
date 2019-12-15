import { createSelector } from "@ngrx/store";

import { DrinksState, getDrinksState } from "./index";
import { BeersState } from "./beers.state-type";

export const getBeers = (state: BeersState) => state && state.beers;
export const getBeerDetail = (state: BeersState) => state && state.beer;
  
export const getBeersStateSelector = createSelector(
  getDrinksState,
  (state: DrinksState) => state && state.beersState
);
export const getBeersSelector = createSelector(getBeersStateSelector, getBeers);
export const getBeerDetailSelector = createSelector(getBeersStateSelector, getBeerDetail);
