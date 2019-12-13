import { createSelector } from "@ngrx/store";

import { DrinksState, getDrinksState } from "./index";
import { BeersState } from "./beers.state-type";

export const getBeers = (state: BeersState) => state.beers;
export const getBeerDetail = (state: BeersState, props: { id: any }) =>
  state.beers.find(beer => beer.id == props.id);
  
export const getBeersStateSelector = createSelector(
  getDrinksState,
  (state: DrinksState) => state.beersState
);
export const getBeersSelector = createSelector(getBeersStateSelector, getBeers);
export const getBeerDetailSelector = createSelector(getBeersStateSelector, getBeerDetail);
