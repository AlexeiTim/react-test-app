export const defineMovieVoteCount = (vote_count: number) => {
    const calcCount = vote_count / 1000
    return calcCount > 1 ? calcCount.toFixed(2) + 'K' : vote_count
}