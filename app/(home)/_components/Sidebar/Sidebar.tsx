/**
 * The Sidebar is composed of a logo, a search bar, and a list of search results, or potential error messages.
 * It allows the user to search for movies and select one to view its details.
 */

'use client';
import styles from "./sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Clapperboard, LoaderCircle } from "lucide-react";
import searchMovies from "@/app/api/search-movies/wrapper";
import adaptMovieSearchResponse from "./adapter";
import { useState } from "react";


/** The data displayed in a row of the list of results */
export interface MovieResult {
    id: number;
    title: string;
    release_date?: Date;
}

type Status =
    | 'initial' // Initial state of the sidebar. No search has been made yet
    | 'idle'    // Normal state
    | 'loading' // Fetching data is in progress
    | 'error';  // Error fetching data

interface SidebarViewProps {
    status: Status;
    results: MovieResult[];
    onSearch: (query: string) => void;
}


/**
 * Stateless view component for the Sidebar. Only handles rendering the UI.
 */
function SidebarView({status, results, onSearch }: SidebarViewProps) {
    const pathname = usePathname();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const query = formData.get("query") as string;
        onSearch(query);
    }

    return (
        <div className={styles.sidebar}>

            {/* Logo */}
            <div className={styles.logo}>
                <Clapperboard size={40}/>
                <h1>FleetMovies</h1>
            </div>

            {/* Search bar */}
            <form onSubmit={onSubmit} className={styles.search_bar}>
                <input type="text" name="query" placeholder="Search movies" required/>
                <button type="submit">
                    {status === "loading" ? <LoaderCircle size={20} className={styles.loader}/> : <Search size={20}/>}
                </button>
            </form>

            {/* Initial message */}
            {status === "initial" && (
                <Clapperboard className={styles.initial_message}/>
            )}

            {/* No results message */}
            {status === "idle" && results.length === 0 && (
                <p className={styles.no_results}>No results found.</p>
            )}

            {/* Error message */}
            {status === "error" && (
                <p className={styles.error}>An error occurred while fetching the data.</p>
            )}

            {/* Results list */}
            <div className={styles.results_container + (status === "loading" ? ` ${styles.loading}` : "")}>
                {results.map(result => (
                    <Link
                        key={result.id}
                        href={`/${result.id}`}
                        className={styles.result_link + (pathname === `/${result.id}` ? ` ${styles.active}` : "")}
                    >
                        <p className={styles.title}>{result.title}</p>
                        <p className={styles.date}>{result.release_date?.getFullYear() || "Unknown"}</p>
                    </Link>
                ))}
            </div>

        </div>
    );
}


/**
 * The Sidebar component fetches movie data from the TMDB API based on a search query.
 */
export default function Sidebar() {
    const [status, setStatus] = useState<SidebarViewProps['status']>('initial');
    const [data, setData] = useState<MovieResult[]>([])

    const handleSearch = async (query: string) => {
        setStatus('loading');
        const { data, error } = await searchMovies({ query, page: 1 });

        if (data && !error) {
            setData(adaptMovieSearchResponse(data));
            setStatus('idle');

        } else {
            setStatus('error');
            setData([]);
        }
    }


    return (
        <SidebarView
            status={status}
            results={data}
            onSearch={handleSearch}
        />
    )
};