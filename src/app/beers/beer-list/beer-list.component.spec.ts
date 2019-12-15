import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { async, TestBed } from '@angular/core/testing';

import { BeerListComponent } from './beer-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { DrinksState } from '../store';
import { fetchBeersListRequest } from '../store/beers.actions';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { skip } from 'rxjs/operators';
import { Observable } from 'rxjs';

describe('BeerListComponent', () => {
  let component: BeerListComponent;
  let store: Store<DrinksState>;
  const fakeNavigate = {
    navigate: jasmine.createSpy("navigate")
  };
  const fakeActivatedRoute = {
    snapshot: { data: {} },
    params: {
      subscribe: () => { }
    },
    queryParams: new Observable(observer => {
        const urlParams = {
          page: 1
        }
				observer.next(urlParams);
				observer.complete();
			})
    
  } as ActivatedRoute;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
        }),
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        BeerListComponent
      ],
      providers: [
        Store,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        {
          provide: Router,
          useValue: fakeNavigate
        }
      ],
    });

    component = TestBed.createComponent(BeerListComponent).componentInstance;
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should fetch data and initialize beers list', () => {
      spyOn(store, 'dispatch').and.callThrough();
      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalledWith(fetchBeersListRequest({page:1}));
      expect(component.beers$).toBeDefined();
    });
  });
});
