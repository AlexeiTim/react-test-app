import { Button } from "@mantine/core";
import { Link } from "react-router-dom"

export const MoviesPage = () => (
    <>
        <Button component={Link} to='/movies/1'>Detail</Button>
        <h3>Movies page </h3>
    </>
);