import { Component, OnInit } from '@angular/core';
import { DrinksState } from '../store';
import { Observable } from 'rxjs/index';
import { fetchBeersListRequest } from '../store/beers.actions';
import { getBeersSelector } from '../store/beers.selectors';
import { select, Store } from '@ngrx/store';
@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {

  public beers$: Observable<any>;
  public name = '';
  constructor(
    private store: Store<DrinksState>
  ) { }

  ngOnInit() {
    this.store.dispatch(fetchBeersListRequest());
    this.beers$ = this.store.pipe(select(getBeersSelector));
  }

}
