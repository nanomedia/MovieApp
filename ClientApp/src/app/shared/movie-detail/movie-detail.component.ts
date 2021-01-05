import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMovieWithRating } from '../models/MovieWithRating';
import { ISearchMovie } from '../models/SearchMovie';
import { RatedMoviesService } from '../../rated-movies/rated-movies.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IUserResponse } from '../models/UserResponse';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  posterPath = environment.posterPath;
  currentUser$: Observable<IUserResponse>;
  @Input()
  movie = {} as ISearchMovie | IMovieWithRating;

  myrate: number = 0;

  constructor(
    private ratedMovieService: RatedMoviesService,
    private router: Router,
    private accountService: AccountService
  ) {
    this.currentUser$ = this.accountService.currentUser$;
  }

  setRating() {
    const movie = this.movie as IMovieWithRating;
    if (this.myrate !== movie.rating) {
      this.setMovieRating(this.movie.id, this.myrate);
    }
  }

  private setMovieRating(movieId: number, rating: number) {
    const sessionId = localStorage.getItem('sessionId');

    this.ratedMovieService.SetMovieRating(sessionId, movieId, rating).subscribe(
      () => {
        this.router.navigateByUrl('ratedmovies');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
