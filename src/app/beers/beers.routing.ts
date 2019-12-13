import { PaginatedComponent } from './paginated/paginated.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { Routes } from '@angular/router';
import { BeerListComponent } from './beer-list/beer-list.component';


export const BeersRouting: Routes = [
  {
    path: 'beers',
    component: BeerListComponent,
  },
  {
    path: 'beers/paginated',
    redirectTo: 'beers/paginated/1'
  },
  {
    path: 'beers/paginated/:page',
    component: PaginatedComponent
  },
  {
    path: 'beers/:id',
    runGuardsAndResolvers: 'always',
    component: BeerDetailComponent
  }
];
