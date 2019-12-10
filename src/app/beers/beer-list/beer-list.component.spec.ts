import { async, TestBed } from '@angular/core/testing';

import { BeerListComponent } from './beer-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { DrinksState } from '../store';
import { fetchBeersListRequest } from '../store/beers.actions';


describe('BeerListComponent', () => {
  let component: BeerListComponent;
  let store: Store<DrinksState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      declarations: [
        BeerListComponent
      ],
      providers: [
        Store
      ]
    });

    component = TestBed.createComponent(BeerListComponent).componentInstance;
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should fetch data and initialize beers list', () => {
      spyOn(store, 'dispatch').and.callThrough();

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(fetchBeersListRequest());
      expect(component.beers$).toBeDefined();
    });
  });
});
