import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export const NotFoundPage = () => (
    <>
        <h1>Not found</h1>
        <Button component={Link} to='/'>Go home</Button>
    </>
)