import getMovieDetails from "@/app/api/get-movie-details/wrapper.server";
import styles from './page.module.css';

/**
 * This is a page showing details for a movie.
 */
export default async function Page({params}: {params: Promise<{movie_id: string}>}) {
    const movieId = (await params).movie_id;
    const { data, error } = await getMovieDetails({ id: parseInt(movieId) });
    if (error) throw new Error(error); // Will show the error page

    return (
        <main className={styles.container}>
            <section className={styles.section}>
                <h1>{data?.title}</h1>
                <p>{data?.overview}</p>
            </section>
        </main>
    );
}