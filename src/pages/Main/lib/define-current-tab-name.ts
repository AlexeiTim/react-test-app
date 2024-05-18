export const defineCurrentTabName = (path: string) => {
    return path.includes('rated') ? 'rated-movies' : 'movies'
}