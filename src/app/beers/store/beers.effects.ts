import { GenericAction } from './../../models';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { BeersService } from "../beers.service";
import {
  FETCH_BEERS_REQUEST,
  FETCH_BEER_REQUEST,
  fetchBeerResponse,
  fetchBeersListFailed,
  fetchBeersListResponse,
} from "./beers.actions";
import { of } from "rxjs/index";

@Injectable()
export class BeersEffects {
  constructor(private actions$: Actions, private beersService: BeersService) { }

  @Effect() fetchBeers = this.actions$.pipe(
    ofType(FETCH_BEERS_REQUEST),
    switchMap((action:GenericAction) => this.beersService.getBeers(action.payload)),
    map(res => fetchBeersListResponse(res)),
    catchError(() => of(fetchBeersListFailed()))
  );
  @Effect() fetchPaginatedBeers = this.actions$.pipe(
    ofType(FETCH_BEER_REQUEST),
    switchMap((action) => this.beersService.getBeer((action as any).payload)),
    map(res => fetchBeerResponse(res)),
    catchError(() => of(fetchBeersListFailed()))
  );
}
