import { BeersQuery } from './../beers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DrinksState } from '../store';
import { Observable } from 'rxjs/index';
import { fetchBeersListRequest } from '../store/beers.actions';
import { getBeersSelector } from '../store/beers.selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-paginated',
  templateUrl: './paginated.component.html',
  styleUrls: ['./paginated.component.scss']
})
export class PaginatedComponent implements OnInit {
  public beers$: Observable<any>;
  public page$: number;
  public updateRequest: Function;
  constructor(
    private store: Store<DrinksState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.beers$ = this.store.pipe(select(getBeersSelector));
    // this.page$ = 1;
    this.updateRequest = (queryParams: BeersQuery) => this.router.navigate(
      ['beers', 'paginated'],
      {
        queryParamsHandling: 'merge',
        queryParams
      });
      
    this.route.queryParams.subscribe((query) => {
      this.page$ = Number(query.page) || 1;
      this.store.dispatch(fetchBeersListRequest(query));
    })
  }
}
