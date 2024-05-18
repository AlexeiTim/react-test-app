import { MovieCard } from "@/entities/movie";
import { Button, Flex, Grid, Input, Pagination, Select } from "@mantine/core";
import emptyMovies from '@/app/assets/imgs/emptyMovies.png'

export const MoviesPage = () => {

    const data = ['a', 'b']
    const items = Array(10).fill(null)

    return (
        <div className="w-full">
            <h1 className="text-[32px]/[140%] font-bold">Movies</h1>

            <Flex direction="column" gap={24}>
                <Flex gap={16} align='end'>
                    <Select label="Genres" data={data} placeholder="Select genres" />
                    <Select label="Release year" data={data} placeholder="Select release year" />
                    <Input.Wrapper label="Rating" className="w-[283px]">
                        <Flex gap={16}>
                            <Input type="number" />
                            <Input type="number" />
                        </Flex>
                    </Input.Wrapper>

                    <Button variant="transparent" color="gray" radius="md">Reset filters</Button>
                </Flex>

                <Flex justify="end">
                    <Select label='Sort by' data={data} />
                </Flex>
                {items.length ? (
                    <>
                        <Grid columns={12} >
                            {items.map(() => (
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <MovieCard />
                                </Grid.Col>
                            ))}
                        </Grid>
                        <Flex justify="end">
                            <Pagination total={3} color="grape" />
                        </Flex>
                    </>
                ) : (
                    <div className="w-[50%] h-[300px] m-auto" style={{ backgroundImage: `url(${emptyMovies})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                )}
            </Flex>
        </div >
    );
}