import { Anchor, Breadcrumbs } from "@mantine/core";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    originalTitle?: string
}

export const MovieDetailBreadcrumbs = (props: Props) => {
    const navigate = useNavigate()

    function handleGoTo(path: string) {
        navigate(path)
    }

    const items = useMemo(() => {
        return [
            { title: 'movies', href: '/movies' },
            { title: props.originalTitle, href: '#' },
        ].map((item, index) => (
            <Anchor onClick={() => handleGoTo(item.href)} key={index}>
                {item.title}
            </Anchor>
        ));
    }, [props.originalTitle])

    return (
        <Breadcrumbs>{items}</Breadcrumbs>
    )
}