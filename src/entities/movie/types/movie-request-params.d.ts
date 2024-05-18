export interface MovieRequestParams {
    with_genres?: string | null
    primary_release_year?: string | null
    ['vote_average.lte']?: string | null
    ['vote_average.gte']?: string | null
    sort_by?: string | null
    page?: number
}