import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RatedMoviesComponent } from './rated-movies/rated-movies.component';

const routes: Routes = [{ path: '', component: RatedMoviesComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class RatedMoviesRoutingModule {}
