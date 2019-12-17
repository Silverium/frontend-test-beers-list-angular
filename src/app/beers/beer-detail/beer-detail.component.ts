import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DrinksState } from '../store';
import { Observable } from 'rxjs/index';
import { getBeerDetailSelector } from '../store/beers.selectors';
import { ActivatedRoute } from '@angular/router';
import { fetchBeerRequest } from '../store/beers.actions';
export const roundToX = (num, X) => {
  return +(Math.round(Number(num + "e+" + X)) + "e-" + X);
}
@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent implements OnInit {
  public beerDetail$: Observable<any>;
  public id$: number;
  public roundToX: Function;

  constructor(
    private store: Store<DrinksState>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.roundToX=roundToX;
    this.beerDetail$ = this.store.pipe(select(getBeerDetailSelector));
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.id$ = id;
      this.store.dispatch(fetchBeerRequest(id));
    });
  }

}
