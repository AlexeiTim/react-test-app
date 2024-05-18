import { Anchor, Breadcrumbs } from "@mantine/core";

export const MovieDetailBreadcrumbs = () => {
    const items = [
        { title: 'movies', href: '/movies' },
        { title: 'Mantine hooks', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Breadcrumbs>{items}</Breadcrumbs>
    )
}