import { Anchor, Breadcrumbs } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
    originalTitle?: string
}

export const MovieDetailBreadcrumbs = (props: Props) => {
    const navigate = useNavigate()
    const location = useLocation()

    function handleGoTo(path: string) {
        navigate(path)
    }

    const items = [
        { title: location.pathname.includes('rated') ? 'rated' : 'movies', href: location.pathname.includes('rated') ? '/rated-movies' : '/movies' },
        { title: props.originalTitle, href: '#' },
    ].map((item, index) => (
        <Anchor onClick={() => handleGoTo(item.href)} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Breadcrumbs>{items}</Breadcrumbs>
    )
}