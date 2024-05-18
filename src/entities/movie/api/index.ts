import { BaseApiService } from "@/shared/service/api";
import { ENDPOINTS } from "../config";
import { Movie } from "../types/movie-response";
import { TableData } from "@/shared/types/api";

export const moviesService = new BaseApiService<TableData<Movie>>(ENDPOINTS.MOVIES)