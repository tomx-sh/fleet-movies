export interface ApiMovieDetailsResponse {
    adult: boolean;
    backdrop_path: string | null; // Can be null if not available
    belongs_to_collection: Collection | null; // Can be null if not part of a collection
    budget: number;
    genres: Genre[];
    homepage: string | null; // Can be null if not available
    id: number;
    imdb_id: string | null; // Can be null if not available
    origin_country: string[]; // Array of country codes
    original_language: string;
    original_title: string;
    overview: string | null; // Can be null if not available
    popularity: number;
    poster_path: string | null; // Can be null if not available
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string; // ISO 8601 date string
    revenue: number;
    runtime: number | null; // Can be null if not available
    spoken_languages: SpokenLanguage[];
    status: string; // e.g., "Released"
    tagline: string | null; // Can be null if not available
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface Collection {
    id: number;
    name: string;
    poster_path: string | null; // Can be null if not available
    backdrop_path: string | null; // Can be null if not available
}

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string | null; // Can be null if not available
    name: string;
    origin_country: string; // Country code
}

interface ProductionCountry {
    iso_3166_1: string; // Country code
    name: string;
}

interface SpokenLanguage {
    english_name: string;
    iso_639_1: string; // Language code
    name: string; // Native name of the language
}