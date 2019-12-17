import { InfiniteComponent } from './infinite/infinite.component';
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
    component: PaginatedComponent
  },
  {
    path: 'beers/infinite',
    component: InfiniteComponent
  },
  {
    path: 'beers/:id',
    runGuardsAndResolvers: 'always',
    component: BeerDetailComponent
  }
];
