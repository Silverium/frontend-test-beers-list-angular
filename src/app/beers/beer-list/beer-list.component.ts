import { Component, OnInit } from '@angular/core';
import { DrinksState } from '../store';
import { Observable } from 'rxjs/index';
import { fetchBeersListRequest } from '../store/beers.actions';
import { getBeersSelector } from '../store/beers.selectors';
import { select, Store } from '@ngrx/store';
import { BeersQuery } from '../beers.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {

  public beers$: Observable<any>;
  public updateRequest: Function;
  constructor(
    private store: Store<DrinksState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.beers$ = this.store.pipe(select(getBeersSelector));
    this.updateRequest = (queryParams: BeersQuery) => this.router.navigate(
      ['beers'],
      {
        queryParamsHandling: 'merge',
        queryParams
      });

    this.route.queryParams.subscribe((query={}) => {
      this.store.dispatch(fetchBeersListRequest(query));
    })

  }

}
