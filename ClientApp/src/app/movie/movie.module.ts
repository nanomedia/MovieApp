import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MovieComponent, MovieDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MovieRoutingModule,
    ReactiveFormsModule
  ],
})
export class MovieModule {}
