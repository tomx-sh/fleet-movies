import { NextRequest } from "next/server";

/**
 * This route handler fetches movie data from the TMDB API based on a search query.
 * The request url should include a query parameter with the search term.
 * The results are paginated, and the page parameter can be used to specify the page number.
 * Use the `searchMovies` wrapper function to call it from a client component.
 * @example `GET /api/search-movies?query=avengers`
 * @example `GET /api/search-movies?query=avengers&page=2`
 * @see https://developer.themoviedb.org/reference/search-movie
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') || '1'; // Default to page 1 if not provided

    if (!query || query.trim() === '') {
        return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const params = new URLSearchParams({
        include_adult: 'false',
        language: 'en-US',
        page: page,
        query: encodeURIComponent(query),
    })

    const url = `https://api.themoviedb.org/3/search/movie?${params}`;
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
            return new Response(JSON.stringify({ error: 'Failed to fetch data from TMDB' }), {
                status: res.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const data = await res.json();
        return new Response(JSON.stringify({ data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
        
    } catch (err) {
        console.error('Error fetching data:', err);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}