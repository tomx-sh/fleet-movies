export interface ApiTrendingMoviesResponse {
    page: number;
    results: TrendingMovie[];
    total_pages: number;
    total_results: number;
}

interface TrendingMovie {
    backdrop_path: string | null; // Can be null if not available
    id: number;
    title: string;
    original_title: string;
    overview: string | null; // Can be null if not available
    poster_path: string | null; // Can be null if not available
    media_type: "movie"; // Indicates the type of media
    adult: boolean;
    original_language: string; // ISO 639-1 language code
    genre_ids: number[]; // Array of genre IDs
    popularity: number;
    release_date: string; // ISO 8601 date string
    video: boolean;
    vote_average: number;
    vote_count: number;
}