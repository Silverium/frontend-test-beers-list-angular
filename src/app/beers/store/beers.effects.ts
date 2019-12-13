import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { BeersService } from "../beers.service";
import {
  FETCH_BEERS_REQUEST,
  fetchBeersListFailed,
  fetchBeersListResponse,
  FETCH_PAGINATED_BEERS_REQUEST
} from "./beers.actions";
import { of } from "rxjs/index";

@Injectable()
export class BeersEffects {
  constructor(private actions$: Actions, private beersService: BeersService) { }

  @Effect() fetchBeers = this.actions$.pipe(
    ofType(FETCH_BEERS_REQUEST),
    switchMap(() => this.beersService.getBeers()),
    map(res => fetchBeersListResponse(res)),
    catchError(() => of(fetchBeersListFailed()))
  );
  @Effect() fetchPaginatedBeers = this.actions$.pipe(
    ofType(FETCH_PAGINATED_BEERS_REQUEST),
    switchMap((action) => this.beersService.getPaginatedBeers((action as any).payload)),
    map(res => fetchBeersListResponse(res)),
    catchError(() => of(fetchBeersListFailed()))
  );
}
