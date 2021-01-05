import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IMovieWithRating } from '../../shared/models/MovieWithRating';
import { ISearchMovie } from '../../shared/models/SearchMovie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  posterPath = environment.posterPath;
  @Input()
  movie: ISearchMovie | IMovieWithRating;

  rate: number = 0;
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {
    let movieId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.movieService.getMovie(movieId).subscribe((response) => {
      this.movie = response as ISearchMovie;
      console.log(this.movie);
    });
  }
}
