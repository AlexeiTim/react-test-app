import { Anchor, Breadcrumbs } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const MovieDetailBreadcrumbs = () => {
    const navigate = useNavigate()

    function handleGoTo(path: string) {
        navigate(path)
    }

    const items = [
        { title: 'movies', href: '/movies' },
        { title: 'Mantine hooks', href: '#' },
    ].map((item, index) => (
        <Anchor onClick={() => handleGoTo(item.href)} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Breadcrumbs>{items}</Breadcrumbs>
    )
}