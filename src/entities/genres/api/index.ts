import { API_METHODS } from "@/shared/config/service";
import { BaseApiService } from "@/shared/service/api";
import { ENDPOINTS } from "../config";
import { GenreResponse } from "../types/genre-response";

export const genresService = new BaseApiService<GenreResponse>(ENDPOINTS.GENRES, [API_METHODS.GET])