import { Button, Input } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"

interface Props {
    searchFavoriteMovies: (value: string) => void
    search: string
    setSearch: (value: string) => void
}

export const SearchRatedMoviesInput = ({ search, searchFavoriteMovies, setSearch }: Props) => {
    return (
        <div className="relative">
            <Input
                size="lg"
                value={search}
                onInput={(e) => setSearch(e.currentTarget.value)}
                className="w-[490px] --input-fz-[14px]"
                style={{ height: '48px', fontSize: '14px' }}
                placeholder="Search movie title"
                leftSection={<IconSearch size={16} />}
            />
            <Button
                onClick={() => searchFavoriteMovies(search)}
                className="w-[90px] absolute cursor-pointer top-[7px]"
                color="grape"
                style={{
                    width: '90px',
                    right: '12px',
                    zIndex: 2
                }}
            >
                Search
            </Button>
        </div>
    )
}
