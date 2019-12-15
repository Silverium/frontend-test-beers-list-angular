import { ActivatedRoute } from '@angular/router';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DrinksState } from '../store';

import { BeerDetailComponent } from './beer-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BeerDetailComponent', () => {
  let component: BeerDetailComponent;
  let fixture: ComponentFixture<BeerDetailComponent>;
  let store: Store<DrinksState>;
  const fakeActivatedRoute = {
  snapshot: { data: {} },
  params: {
    subscribe: ()=>{}
  }
} as ActivatedRoute;

beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot({})
    ],
    schemas: [NO_ERRORS_SCHEMA],
    declarations: [BeerDetailComponent],
    providers: [
      Store,
      { provide: ActivatedRoute, useValue: fakeActivatedRoute }
    ]
  })
    .compileComponents();
}));

beforeEach(() => {
  fixture = TestBed.createComponent(BeerDetailComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

it('should create', () => {
  expect(component).toBeTruthy();
});
});
