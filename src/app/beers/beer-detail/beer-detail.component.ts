import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DrinksState } from '../store';
import { Observable } from 'rxjs/index';
import { getBeerDetailSelector } from '../store/beers.selectors';
import { ActivatedRoute } from '@angular/router';
import { fetchBeersListRequest, fetchPaginatedBeersListRequest } from '../store/beers.actions';
@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent implements OnInit {
  public beerDetail$: Observable<any>;

  constructor(
    private store: Store<DrinksState>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id
    const page = Math.ceil(id/25)
    this.store.dispatch(fetchPaginatedBeersListRequest(page));
    this.beerDetail$ = this.store.pipe(select(getBeerDetailSelector, { id }));
  }

}
