import { MovieResult } from "./SidebarView";
import { ApiMovieSearchResponse } from "@/app/api/search-movies/types";
import { ApiTrendingMoviesResponse } from "@/app/api/get-trending-movies/types";

const API_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/**
 * This adapter function transforms the API response into a format that the Sidebar component can use.
 */
export function adaptMovieSearchResponse(response: ApiMovieSearchResponse): MovieResult[] {
    return response.results.map((result) => ({
        id: result.id,
        title: result.title,
        releaseDate: new Date(result.release_date), // TODO: Handle invalid dates
        posterUrl: result.poster_path ? API_IMAGE_BASE_URL + result.poster_path : undefined,
        voteAverage: result.vote_average,
        voteCount: result.vote_count
    }));
}


/**
 * This adapter function transforms the API response into a format that the Sidebar component can use.
 */
export function adaptTrendingMoviesResponse(response: ApiTrendingMoviesResponse): MovieResult[] {
    return response.results.map((result) => ({
        id: result.id,
        title: result.title,
        releaseDate: new Date(result.release_date), // TODO: Handle invalid dates
        posterUrl: result.poster_path ? API_IMAGE_BASE_URL + result.poster_path : undefined,
        voteAverage: result.vote_average,
        voteCount: result.vote_count
    }));
}