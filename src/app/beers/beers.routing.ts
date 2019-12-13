import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { Routes } from '@angular/router';
import { BeerListComponent } from './beer-list/beer-list.component';


export const BeersRouting: Routes = [
  {
    path: 'beers',
    component: BeerListComponent
  },
  {
    path: 'beers/:id',
    component: BeerDetailComponent
  }
];
