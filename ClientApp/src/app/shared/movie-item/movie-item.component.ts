import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ISearchMovie } from 'src/app/shared/models/SearchMovie';
import { environment } from 'src/environments/environment';
import { IMovieWithRating } from '../models/MovieWithRating';
import { RatedMoviesService } from '../../rated-movies/rated-movies.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  posterPath = environment.posterPath;
  @Input()
  movie = {} as ISearchMovie | IMovieWithRating;

  rate: number = 0;

  @Output()
  wasChanged = new EventEmitter();

  constructor(private ratedMovieService: RatedMoviesService) {}


  ngOnInit(): void {
    if(this.isMovieWithWating) {
      const movie = this.movie as IMovieWithRating;
      this.rate = movie.rating;
    }
  }

  get isMovieWithWating() {
    return 'rating' in this.movie;
  }

  setRating() {
    if(this.isMovieWithWating) {
      const movie = this.movie as IMovieWithRating;
      if(this.rate !== movie.rating) {
        this.setMovieRating(this.movie.id,this.rate);
      }
    }
  }

  private setMovieRating(movieId:number, rating: number) {
    const sessionId = localStorage.getItem('sessionId');

    this.ratedMovieService
      .SetMovieRating(sessionId, movieId, rating)
      .subscribe(() => {
        this.wasChanged.emit(1);
      },
      (error)=>{
        console.log(error);
      });
  }

  remove(): void {
    const sessionId = localStorage.getItem('sessionId');
    if (this.movie) {
      this.ratedMovieService
        .RemoveMovieRating(sessionId, this.movie.id)
        .subscribe(() => {
          this.wasChanged.emit(1);
        });
    }
  }

}
