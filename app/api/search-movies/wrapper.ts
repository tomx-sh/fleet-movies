import { ApiMovieSearchResponse } from "./types";


interface SearchMoviesArgs {
    /** The keyword to search for */
    query: string;

    /** The page number of the results. Defaults to 1. (API response is paginated) */
    page: number | undefined;
}

interface SearchMoviesResponse {
    data: ApiMovieSearchResponse | undefined;
    error: string | undefined;
}

/**
 * Fetches movie data from the TMDB API based on a search query.
 */
export default async function searchMovies({ query, page }: SearchMoviesArgs): Promise<SearchMoviesResponse> {

    if (page == 0) return { data: undefined, error: "Page should be > 0"}

    const params = new URLSearchParams({
        query: query,
        page: page ? page.toString() : '1',
    });

    try {
        const res = await fetch(`/api/search-movies?${params}`);
        if (!res.ok) {
            const { error } = await res.json();
            throw new Error('Failed to fetch data from TMDB: ' + error);
        }
        const data = (await res.json()).data as ApiMovieSearchResponse;
        return { data, error: undefined };

    } catch (err) {
        console.error('Error fetching data:', err);
        return { data: undefined, error: 'Internal Server Error' };
    }
}