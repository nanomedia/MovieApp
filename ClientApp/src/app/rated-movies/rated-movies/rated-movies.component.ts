import { Component, OnInit } from '@angular/core';
import { IMovieWithRating } from 'src/app/shared/models/MovieWithRating';
import { ISearchContainer } from 'src/app/shared/models/SearchContainer';
import { RatedMoviesService } from '../rated-movies.service';

@Component({
  selector: 'app-rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.scss'],
})
export class RatedMoviesComponent implements OnInit {
  constructor(private ratedMoviesService: RatedMoviesService) {}

  movieContainer: ISearchContainer<IMovieWithRating> = {};

  ngOnInit(): void {
    // this.setRating();
    // this.removeRating();
    this.myRatedMovies();
  }

  myRatedMovies() {
    const sessionId = localStorage.getItem('sessionId');
    this.ratedMoviesService
      .GetRatedMovies(sessionId, 1)
      .subscribe((response) => {
        this.movieContainer = response;
        console.log(response);
      });
  }
  update(event:any) {
    this.myRatedMovies();
  }

  removeRating() {
    const sessionId = localStorage.getItem('sessionId');

    this.ratedMoviesService
      .RemoveMovieRating(sessionId, 464052)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
