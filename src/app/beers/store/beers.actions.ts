
import { Action } from '@ngrx/store';
import { GenericAction } from '../../models';
import { BeersQuery } from '../beers.service';
 

export const FETCH_BEERS_REQUEST = '[Beers] fetch list of beers request';
export const FETCH_BEERS_INFINITE = '[Beers] fetch list of infinite beers request';
export const FETCH_BEERS_INFINITE_RESPONSE = '[Beers] fetch response list of infinite beers request';
export const FETCH_BEERS_RESPONSE = '[Beers] fetch list of beers response';
export const FETCH_BEERS_FAILED = '[Beers] fetching beers failed';
export const FETCH_BEER_REQUEST = '[Beers] fetch beer request';
export const FETCH_BEER_RESPONSE = '[Beers] fetch beer response';
export const CLEAR_BEERS_LIST = '[Beers] clear beers list';

export const fetchBeersListRequest = (query: BeersQuery): Action => {
  return new GenericAction(FETCH_BEERS_REQUEST, query);
};
export const fetchBeersListInfinite = (query: BeersQuery): Action => {
  return new GenericAction(FETCH_BEERS_INFINITE, query);
};

export const fetchBeersListInfiniteResponse = (beers: any): Action => {
  return new GenericAction(FETCH_BEERS_INFINITE_RESPONSE, beers);
};
export const fetchBeersListResponse = (beers: any): Action => {
  return new GenericAction(FETCH_BEERS_RESPONSE, beers);
};

export const clearBeersList = (): Action => {
  return new GenericAction(CLEAR_BEERS_LIST);
};

export const fetchBeersListFailed = (): Action => {
  return new GenericAction(FETCH_BEERS_FAILED);
};

export const fetchBeerResponse = (beer: any): Action => {
  return new GenericAction(FETCH_BEER_RESPONSE, beer);
};

export const fetchBeerRequest = (id: number): Action => {
  return new GenericAction(FETCH_BEER_REQUEST, id);
};