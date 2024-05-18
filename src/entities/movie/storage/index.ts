import { STORAGE_KEYS } from '@/shared/config/storage-keys';
import { Movie } from './../types/movie-response.d';

class FavoriteMoviesStorage {
    favoritesMap = new Map()
    init = false

    save(favoriteMovie: Movie & { favoriteRating: number }) {
        if (!this.init)
            this.initFavorites()

        this.favoritesMap.set(favoriteMovie.id, favoriteMovie)
        const newArray = Array.from(this.favoritesMap, ([_, value]) => value)
        localStorage.setItem(STORAGE_KEYS.FAVORITE_MOVIES, JSON.stringify(newArray))
    }

    delete(id: number) {
        if (!this.init)
            this.initFavorites()

        this.favoritesMap.delete(id)
        const newArray = Array.from(this.favoritesMap, ([_, value]) => value)
        localStorage.setItem(STORAGE_KEYS.FAVORITE_MOVIES, JSON.stringify(newArray))
    }

    initFavorites() {
        const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITE_MOVIES)
        if (favorites) {
            const parseFavorites = JSON.parse(favorites)
            parseFavorites.forEach(f => this.favoritesMap.set(f.id, f))
        }

        this.init = true
    }

    get favorites() {
        if (!this.init)
            this.initFavorites()

        if (!this.favoritesMap.size)
            return []

        return Array.from(this.favoritesMap, ([_, value]) => value)
    }
}

export const favoriteMoviesStorageService = new FavoriteMoviesStorage()