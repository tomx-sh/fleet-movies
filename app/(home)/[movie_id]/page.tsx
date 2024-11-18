export default async function Page({params}: {params: Promise<{movie_id: string}>}) {
    const movieId = (await params).movie_id;
    return (
        <div>
            <p>Movie</p>
            <p>{movieId}</p>
        </div>
    );
}