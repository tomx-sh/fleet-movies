// TODO: use the 'server-only' package to make sure this code will never run on the client,
// as suggested here https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import { ApiMovieDetailsResponse } from "./types";


interface GetMovieDetailsArgs {
    id: number;
}

interface GetMovieDetailsResponse {
    data: ApiMovieDetailsResponse | undefined;
    error: string | undefined;
}


/**
 * Fetches movie data from the TMDB API.
 * It should be called from a server component.
 * @see https://developer.themoviedb.org/reference/movie-details
 */
export default async function getMovieDetails({ id }: GetMovieDetailsArgs): Promise<GetMovieDetailsResponse> {
    const apiParams = new URLSearchParams({
        language: 'en-US',
    })

    const url = `https://api.themoviedb.org/3/movie/${id}?${apiParams}`;
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
        const data = await res.json() as ApiMovieDetailsResponse;
        return { data, error: undefined };

    } catch (err) {
        console.error('Error fetching data:', err);
        return { data: undefined, error: 'Failed to fetch data' };
    }
}