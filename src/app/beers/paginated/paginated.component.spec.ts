import { Store, StoreModule } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedComponent } from './paginated.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DrinksState } from '../store';

describe('PaginatedComponent', () => {
  let component: PaginatedComponent;
  let store: Store<DrinksState>;
  let fixture: ComponentFixture<PaginatedComponent>;
  const fakeNavigate = {
    navigate: jasmine.createSpy("navigate")
  };
  const fakeActivatedRoute = {
    snapshot: { data: {} },
    params: {
      subscribe: () => { }
    },
    queryParams: {
      subscribe: () => { }
    }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatedComponent],
      imports: [
        StoreModule.forRoot({
        }),
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        Store,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        {
          provide: Router,
          useValue: fakeNavigate
        }
      ]
    })
      .compileComponents();
      
      store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
