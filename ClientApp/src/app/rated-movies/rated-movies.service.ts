import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMovieWithRating } from '../shared/models/MovieWithRating';
import { ISearchContainer } from '../shared/models/SearchContainer';

@Injectable({
  providedIn: 'root',
})
export class RatedMoviesService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  GetRatedMovies(sessionId: string, page: number) {
    return this.http
      .get<ISearchContainer<IMovieWithRating>>(
        `${this.baseUrl}RatedMovie?sessionId=${sessionId}&page=${page}`
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  SetMovieRating(sessionId: string, movieId: number, rating: number) {
    return this.http.post(`${this.baseUrl}RatedMovie`, {
      sessionId,
      movieId,
      rating,
    });
  }

  RemoveMovieRating(sessionId: string, movieId: number) {
    return this.http.post(`${this.baseUrl}RatedMovie/remove`, {
      sessionId,
      movieId,
    });
  }
}
