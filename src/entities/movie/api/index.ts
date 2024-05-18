import { BaseApiService, makeRequest } from "@/shared/service/api";
import { ENDPOINTS } from "../config";
import { Movie } from "../types/movie-response";
import { BaseResponse, TableData } from "@/shared/types/api";
import { API_METHODS } from "@/shared/config/service";
import type { MovieDetailResponse } from "../types/movies-detail-response";

class MoviesService<T> extends BaseApiService<T> {
    constructor(endpoint: string) {
        super(endpoint)
    }

    public async getOne(id: number): Promise<BaseResponse<MovieDetailResponse>> {
        return makeRequest<MovieDetailResponse>({
            url: `${ENDPOINTS.MOVIE_DETAIL}/${id}`,
            method: API_METHODS.GET,
            params: {
                append_to_response: 'videos'
            }
        })
    }
}
export const moviesService = new MoviesService<TableData<Movie>>(ENDPOINTS.MOVIES)