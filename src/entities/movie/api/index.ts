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

    public async getMovie(id: number): Promise<BaseResponse<MovieDetailResponse>> {
        return makeRequest<MovieDetailResponse>({
            url: `${ENDPOINTS.MOVIES}/${id}`,
            method: API_METHODS.GET,
        })
    }
}
export const moviesService = new MoviesService<TableData<Movie>>(ENDPOINTS.MOVIES)