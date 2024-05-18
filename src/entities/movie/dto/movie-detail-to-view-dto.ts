import { Movie } from "../types/movie-response";
import { MovieDetailResponse } from "../types/movies-detail-response";

export class MovieDetailViewDTO implements Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    constructor(movie: MovieDetailResponse) {
        this.adult = movie.adult
        this.backdrop_path = movie.backdrop_path
        this.genre_ids = movie.genres.map(g => g.id)
        this.id = movie.id
        this.original_language = movie.original_language
        this.original_title = movie.original_title
        this.overview = movie.overview
        this.popularity = movie.popularity
        this.poster_path = movie.poster_path
        this.release_date = movie.release_date
        this.title = movie.title
        this.video = movie.video
        this.vote_average = movie.vote_average
        this.vote_count = movie.vote_count
    }
}