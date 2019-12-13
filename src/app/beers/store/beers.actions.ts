
import { Action } from '@ngrx/store';
import { GenericAction } from '../../models';


export const FETCH_BEERS_REQUEST = '[Beers] fetch list of beers request';
export const FETCH_BEERS_RESPONSE = '[Beers] fetch list of beers response';
export const FETCH_BEERS_FAILED = '[Beers] fetch list of beers failed';
export const GET_BEER = '[Beers] get beer from list';

export const fetchBeersListRequest = (): Action => {
  return new GenericAction(FETCH_BEERS_REQUEST);
};

export const fetchBeersListResponse = (beers: any): Action => {
  return new GenericAction(FETCH_BEERS_RESPONSE, beers);
};

export const fetchBeersListFailed = (): Action => {
  return new GenericAction(FETCH_BEERS_FAILED);
};
