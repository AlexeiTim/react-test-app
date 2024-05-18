export const defineCurrentTabName = (path: string) => {
    return path === '/movies' ? 'movies' : 'rated-movies'
}