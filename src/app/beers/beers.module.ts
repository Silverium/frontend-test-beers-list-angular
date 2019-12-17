import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { BeerListComponent } from './beer-list/beer-list.component';
import { BeersEffects } from './store/beers.effects';
import { BeersRouting } from './beers.routing';
import { BeersService } from './beers.service';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PaginatedComponent } from './paginated/paginated.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { beersReducers } from './store';
import { InfiniteComponent } from './infinite/infinite.component';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([BeersEffects]),
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(BeersRouting),
    StoreModule.forFeature('drinks', beersReducers),
  ],
  declarations: [
    BeerListComponent,
    BeerDetailComponent,
    PaginatedComponent,
    InfiniteComponent
  ],
  providers: [
    BeersService,
  ]
})
export class BeersModule { }
