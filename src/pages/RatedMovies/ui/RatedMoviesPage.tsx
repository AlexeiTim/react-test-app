import { useEffect, useMemo, useState } from "react";
import { favoriteMoviesStorageService } from "@/entities/movie/storage";
import { MovieFavorite } from "@/entities/movie/types/movie-favorite";
import { RatedEmpty } from "./RatedEmpty";
import { RatedContent } from "./RatedContent";
import { RatedHeader } from "./RatedHeader";
import { Text } from "@mantine/core";

export const RatedMoviesPage = () => {
    const [totalPages, setTotalPages] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [favoritesMovies, setFavoritesMovies] = useState<MovieFavorite[]>([])
    const [searchMovies, setSearchMovies] = useState<MovieFavorite[]>([])
    const [search, setSearch] = useState<string>('')

    function definePagination(favoritesMovies: MovieFavorite[]) {
        const totalPages = Math.ceil(favoritesMovies.length / 20)
        setTotalPages(totalPages)
    }

    function handleSearchFavoriteMovies() {
        setActivePage(1)
        searchFavoriteMovies()
    }

    function searchFavoriteMovies() {
        if (!search) return setSearchMovies(favoriteMoviesStorageService.favorites)
        return setSearchMovies(favoriteMoviesStorageService.favorites.filter(f => f.original_title.toLowerCase().indexOf(search.toLocaleLowerCase()) >= 0))
    }

    useEffect(() => {
        setFavoritesMovies([...favoriteMoviesStorageService.favorites])
        setSearchMovies([...favoriteMoviesStorageService.favorites])
        definePagination(favoriteMoviesStorageService.favorites)
    }, [])

    function handleChangeFavorite() {
        searchFavoriteMovies()
    }

    const resultFavoriteMovies = useMemo(() => {
        setTotalPages(Math.ceil(searchMovies.length / 20))
        return searchMovies.slice((activePage - 1) * 20, activePage * 20)
    }, [activePage, searchMovies])

    if (!favoritesMovies.length)
        return <RatedEmpty />

    return (
        <div>
            <RatedHeader
                search={search}
                setSearch={setSearch}
                searchFavoriteMovies={handleSearchFavoriteMovies}
            />

            {!resultFavoriteMovies.length &&
                <Text className="text-center">No Search</Text>
            }

            <RatedContent
                movies={resultFavoriteMovies}
                changeFavorite={handleChangeFavorite}
                totalPages={totalPages}
                activePage={activePage}
                setActivePage={setActivePage}
            />

        </div>
    )
}

