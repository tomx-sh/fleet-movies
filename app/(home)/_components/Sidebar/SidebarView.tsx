'use client';
import styles from "./SidebarView.module.css";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Search, Clapperboard, LoaderCircle } from "lucide-react";
import Row, { RowProps } from "./Row/Row";


export interface SidebarViewProps {
    status: Status;
    results: MovieResult[];
    onSearch: (query: string) => void;
    initialQuery?: string; // Initial value in the search bar
}

type Status =
    | 'initial' // Initial state of the sidebar. No search has been made yet
    | 'idle'    // Normal state
    | 'loading' // Fetching data is in progress
    | 'error';  // Error fetching data


/**
 * Data needed to display a movie in the sidebar.
 * It corresponds to the props of the Row component,
 * minus the href and active props,
 * which are derived from the `id` and the current URL.
 */
export interface MovieResult extends Omit<RowProps, "href" | "active"> {
    id: number;
}


/**
 * Stateless view component for the Sidebar. Only handles rendering the UI.
 * This component is composed of a logo, a search bar, and a list of search results, or potential error messages.
 * It allows the user to search for movies and select one to view its details.
 */
export default function SidebarView({status, results, onSearch, initialQuery }: SidebarViewProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const query = formData.get("query") as string;
        onSearch(query);
    }

    return (
        <div className={styles.sidebar}>

            {/* Logo (serves also as a home button */}
            <Link className={styles.logo} href="/">
                <Clapperboard size={40}/>
                <h1>FleetMovies</h1>
            </Link>

            {/* Search bar */}
            <form onSubmit={onSubmit} className={styles.search_bar}>
                <input type="text" name="query" placeholder="Search movies" defaultValue={initialQuery} required/>
                <button type="submit">
                    {
                        status === "loading" ?
                        <LoaderCircle size={15} strokeWidth={3} className={styles.loader}/>
                        : <Search size={15} strokeWidth={3}/>
                    }
                </button>
            </form>

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
                    <Row
                        key={result.id}
                        href={`/${result.id}?${searchParams.toString()}`} // Preserve the search params in the URL
                        active={pathname === `/${result.id}`}
                        title={result.title}
                        releaseDate={result.releaseDate}
                        posterUrl={result.posterUrl}
                        voteAverage={result.voteAverage}
                        voteCount={result.voteCount}
                    />
                ))}
            </div>

        </div>
    );
}


