import { Flex, Text } from "@mantine/core"
import { SearchRatedMoviesInput } from "./RatedSearchInput"

interface Props {
    searchFavoriteMovies: (value: string) => void
    search: string
    setSearch: (value: string) => void
}

export const RatedHeader = (props: Props) => {
    return (
        <Flex align="center" justify="space-between" mb={40} className="w-full">
            <Text fw={600} size="32px">Rated movies</Text>
            <SearchRatedMoviesInput
                search={props.search}
                setSearch={props.setSearch}
                searchFavoriteMovies={props.searchFavoriteMovies}
            />
        </Flex>
    )
}