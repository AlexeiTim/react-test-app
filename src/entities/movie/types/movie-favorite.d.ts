import { Movie } from "./movie-response";

export interface MovieFavorite extends Movie {
    favoriteRating: number
}