import { ActivatedRoute, Router } from '@angular/router';
import { BeersQuery } from './../beers.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { DrinksState } from '../store';
import { Observable } from 'rxjs/index';
import { clearBeersList, fetchBeersListInfinite } from '../store/beers.actions';
import { getBeersSelector } from '../store/beers.selectors';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';




@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.component.html',
  styleUrls: ['./infinite.component.scss']
})
export class InfiniteComponent implements OnInit, DoCheck {
  public beers$: Observable<any>;
  public page$: number;
  private updateRequest: Function;
  public updateSearch: Function;
  private targetIndex: number;
  private observer: IntersectionObserver;
  private beersLength: number;
  private beerObserved: any;
  constructor(
    private store: Store<DrinksState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  ngDoCheck() {

    const targets = document.querySelectorAll('.beer');
    if (targets.length > 7) {
      const index = targets.length - 7;

      if (this.targetIndex !== index) {
        this.targetIndex = index;
        this.beerObserved = targets[index];
        this.observer.observe(this.beerObserved);
      }
    }
  }

  ngOnInit() {
    this.observer = new IntersectionObserver((changes, observer) => {
      changes.forEach(change => {
        if (change.intersectionRatio > 0) {
          this.updateRequest({ page: this.page$ + 1 })
          observer.unobserve(change.target);
        }
      })
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    });

    this.beers$ = this.store.pipe(
      select(getBeersSelector),
      map(res => {
        this.beersLength = res.length;
        return res;
      })
    );
    this.updateRequest = (queryParams: BeersQuery) => {

      return this.router.navigate(
        ['beers', 'infinite'],
        {
          queryParamsHandling: 'merge',
          queryParams,
        }
      )
    };
    this.updateSearch = (beer_name: string) => {
      this.store.dispatch(clearBeersList())
      this.router.navigate(
        ['beers', 'infinite'],
        { queryParams: { page: 1, beer_name } }
      )
    }


    this.route.queryParams.subscribe((query) => {
      this.page$ = Number(query.page) || 1;
      this.store.dispatch(fetchBeersListInfinite(query));
    })
  }
}
