import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DrinksState } from '../store';
import { Observable } from 'rxjs/index';
import { fetchPaginatedBeersListRequest } from '../store/beers.actions';
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
  public goTo: Function;
  constructor(
    private store: Store<DrinksState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.goTo = (page: number) => this.router.navigate(['beers', 'paginated', page]);
    this.route.params.subscribe((value) => {
      this.page$ = value.page;
      this.store.dispatch(fetchPaginatedBeersListRequest(this.page$));
      this.beers$ = this.store.pipe(select(getBeersSelector));

    });
  }
}
