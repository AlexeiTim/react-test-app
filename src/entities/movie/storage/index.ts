import { STORAGE_KEYS } from '@/shared/config/storage-keys';
import { MovieFavorite } from '../types/movie-favorite';

class FavoriteMoviesStorage {
    favoritesMap: Map<number, MovieFavorite> = new Map()
    init = false

    save(favoriteMovie: MovieFavorite) {
        if (!this.init)
            this.initFavorites()

        this.favoritesMap.set(favoriteMovie.id, favoriteMovie)
        const newArray = Array.from(this.favoritesMap, (favoriteArray) => favoriteArray[1])
        localStorage.setItem(STORAGE_KEYS.FAVORITE_MOVIES, JSON.stringify(newArray))
    }

    delete(id: number) {
        if (!this.init)
            this.initFavorites()

        this.favoritesMap.delete(id)
        const newArray = Array.from(this.favoritesMap, (favoriteArray) => favoriteArray[1])
        localStorage.setItem(STORAGE_KEYS.FAVORITE_MOVIES, JSON.stringify(newArray))
    }

    initFavorites() {
        const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITE_MOVIES)
        if (favorites) {
            const parseFavorites: MovieFavorite[] = JSON.parse(favorites)
            parseFavorites.forEach(f => this.favoritesMap.set(f.id, f))
        }

        this.init = true
    }

    get favorites(): MovieFavorite[] {
        if (!this.init)
            this.initFavorites()

        if (!this.favoritesMap.size)
            return []

        return Array.from(this.favoritesMap, (favoriteArray) => favoriteArray[1])
    }
}

export const favoriteMoviesStorageService = new FavoriteMoviesStorage()