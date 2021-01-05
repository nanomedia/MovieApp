import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MovieFilter } from '../shared/models/MovieFilter';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ISearchContainer } from '../shared/models/SearchContainer';
import { ISearchMovie } from '../shared/models/SearchMovie';
import { ISearchPerson } from '../shared/models/SearchPerson';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchMovie(movieFilter: MovieFilter) {
    return this.http
      .post<ISearchContainer<ISearchMovie>>(
        `${this.baseUrl}Movie/searchMovie`,
        movieFilter
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getMovie(movieId: number) {
    return this.http
      .get<ISearchContainer<ISearchMovie>>(
        `${this.baseUrl}Movie/getMovie?movieId=${movieId}`
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  searchPersonByName(filter: string) {
    return this.http
      .get<ISearchContainer<ISearchPerson>>(
        `${this.baseUrl}Movie/getPersonByName?name=${filter}`
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
