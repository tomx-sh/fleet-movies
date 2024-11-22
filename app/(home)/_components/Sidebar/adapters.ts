import { MovieResult } from "./SidebarView";
import { ApiMovieSearchResponse } from "@/app/api/search-movies/types";
import { ApiTrendingMoviesResponse } from "@/app/api/get-trending-movies/types";

/**
 * This adapter function transforms the API response into a format that the Sidebar component can use.
 */
export function adaptMovieSearchResponse(response: ApiMovieSearchResponse): MovieResult[] {
    return response.results.map((result) => ({
        id: result.id,
        title: result.title,
        release_date: new Date(result.release_date), // TODO: Handle invalid dates
    }));
}


/**
 * This adapter function transforms the API response into a format that the Sidebar component can use.
 */
export function adaptTrendingMoviesResponse(response: ApiTrendingMoviesResponse): MovieResult[] {
    return response.results.map((result) => ({
        id: result.id,
        title: result.title,
        release_date: new Date(result.release_date), // TODO: Handle invalid dates
    }));
}