import { Observable } from 'rxjs/index';
import { ActivatedRoute } from '@angular/router';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DrinksState } from '../store';

import { BeerDetailComponent, roundToX } from './beer-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
const mockedBeer = {
  "id": 2,
  "name": "Trashy Blonde",
  "tagline": "You Know You Shouldn't",
  "first_brewed": "04/2008",
  "description": "A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.",
  "image_url": "https://images.punkapi.com/v2/2.png",
  "abv": 4.1,
  "ibu": 41.5,
  "target_fg": 1010,
  "target_og": 1041.7,
  "ebc": 15,
  "srm": 15,
  "ph": 4.4,
  "attenuation_level": 76,
  "food_pairing": [
    "Fresh crab with lemon",
    "Garlic butter dipping sauce",
    "Goats cheese salad",
    "Creamy lemon bar doused in powdered sugar"
  ],
  "contributed_by": "Sam Mason <samjbmason>"
}
describe('BeerDetailComponent', () => {
  let component: BeerDetailComponent;
  let fixture: ComponentFixture<BeerDetailComponent>;
  let store: Store<DrinksState>;
  const fakeActivatedRoute = {
    snapshot: { data: {} },
    params: {
      subscribe: () => { }
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

  describe('Given a beer object', () => {
    beforeEach(() => {
      component.beerDetail$ = new Observable(observer => observer.next(mockedBeer));
      fixture.detectChanges();
    });
    it('should include the name', () => {
      const hasText = fixture.debugElement.nativeElement.textContent.includes(mockedBeer.name)
      expect(hasText).toBe(true);
    });
    it('should include the description', () => {
      const hasText = fixture.debugElement.nativeElement.textContent.includes(mockedBeer.description)
      expect(hasText).toBe(true);
    });
    it('should include the first brewed', () => {
      const hasText = fixture.debugElement.nativeElement.textContent.includes(mockedBeer.first_brewed)
      expect(hasText).toBe(true);
    });
    it('should include an image with correspondent src', () => {
      const imgNode = fixture.nativeElement.querySelector('img');
      expect(imgNode.src).toBe(mockedBeer.image_url);
    });
    it('should include the food pairing', () => {
      mockedBeer.food_pairing.forEach(pairing => {
        const hasText = fixture.debugElement.nativeElement.textContent.includes(pairing)
        expect(hasText).toBe(true);
      })
    });
    it('should include the abv', () => {
      const hasText = fixture.debugElement.query(By.css('#abv')).nativeElement.textContent.includes(mockedBeer.abv)
      expect(hasText).toBe(true);
    });
    it('should include the ibu', () => {
      const hasText = fixture.debugElement.query(By.css('#ibu')).nativeElement.textContent.includes(mockedBeer.ibu)
      expect(hasText).toBe(true);
    });
    it('should include the contributors', () => {
      const hasText = fixture.debugElement.nativeElement.textContent.includes(mockedBeer.contributed_by)
      expect(hasText).toBe(true);
    });
    it('should include the gravity difference', () => {
      const hasText = fixture.debugElement.nativeElement.textContent.includes(roundToX(mockedBeer.target_og - mockedBeer.target_fg, 2))
      expect(hasText).toBe(true);
    });
  });
});
