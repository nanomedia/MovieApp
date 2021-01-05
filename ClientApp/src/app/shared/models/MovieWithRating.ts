export interface IMovieWithRating {
  rating: number;
  adult: boolean;
  originalTitle: string;
  releaseDate: Date;
  title: string;
  video: boolean;
  backdropPath: string;
  genreIds: number[];
  originalLanguage: string;
  overview: string;
  posterPath: string;
  voteAverage: number;
  voteCount: number;
  id: number;
  mediaType: number;
  popularity: number;
}
