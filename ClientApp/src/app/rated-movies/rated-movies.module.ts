import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatedMoviesComponent } from './rated-movies/rated-movies.component';
import { RatedMoviesRoutingModule } from './rated-movies-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RatedMoviesComponent],
  imports: [
    CommonModule,
    RatedMoviesRoutingModule,
    SharedModule
  ]
})
export class RatedMoviesModule { }
