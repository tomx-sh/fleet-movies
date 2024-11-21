/** Result type of the TMDB API for search/movie */
export interface ApiMovieSearchResponse {
    page: number;
    results: ApiMovieResult[];
    total_pages: number;
    total_results: number;
}

interface ApiMovieResult {
    adult: boolean;
    backdrop_path: string | null; // Can be null if not available
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null; // Can be null if not available
    release_date: string; // ISO 8601 date string
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}