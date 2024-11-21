import getMovieDetails from "@/app/api/get-movie-details/wrapper.server";

/**
 * This is a page showing details for a movie.
 */
export default async function Page({params}: {params: Promise<{movie_id: string}>}) {
    const movieId = (await params).movie_id;
    const { data, error } = await getMovieDetails({ id: parseInt(movieId) });
    if (error) throw new Error(error); // Will show the error page

    return (
        <main>
            <h1>{data?.title}</h1>
            <p>{data?.overview}</p>
        </main>
    );
}