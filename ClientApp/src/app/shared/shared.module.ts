import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { RouterModule } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

@NgModule({
  declarations: [PagingHeaderComponent, MovieItemComponent, MovieDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RatingModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule
  ],
  exports:[
    RatingModule,
    TypeaheadModule,
    BsDatepickerModule,
    BsDropdownModule,
    PaginationModule,
    PagingHeaderComponent,
    MovieItemComponent,
    MovieDetailComponent
  ]
})
export class SharedModule { }
