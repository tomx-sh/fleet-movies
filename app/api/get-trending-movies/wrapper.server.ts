// TODO: use the 'server-only' package to make sure this code will never run on the client,
// as suggested here https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import { ApiTrendingMoviesResponse } from "./types";



interface GetTrendingMoviesResponse {
    data: ApiTrendingMoviesResponse | undefined;
    error: string | undefined;
}


/**
 * Fetches trending movies from the TMDB API.
 * It should be called from a server component.
 * @see https://developer.themoviedb.org/reference/trending-movies
 */
export default async function getTrendingMovies(timeWindow: 'day' | 'week' = 'day'): Promise<GetTrendingMoviesResponse> {
    const apiParams = new URLSearchParams({
        language: 'en-US',
    })

    const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?${apiParams}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            return { data: undefined, error: 'Failed to fetch data' };
        }
        const data = await res.json() as ApiTrendingMoviesResponse;
        return { data, error: undefined };

    } catch (err) {
        console.error('Error fetching data:', err);
        return { data: undefined, error: 'Failed to fetch data' };
    }
}
