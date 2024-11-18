'use client';
import { mockMovieResults } from "./mock-data";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Clapperboard, LoaderCircle } from "lucide-react";


export interface MovieResult {
    id: number;
    title: string;
    release_date: Date;
}

interface SidebarViewProps {
    status: 'idle' | 'loading' | 'error';
    results: MovieResult[];
    onSearch: (query: string) => void;
    onSelect: (id: number) => void;
    className?: string;
}

interface SidebarProps {
    className?: string;
}


function SidebarView({status, results, onSearch, className}: SidebarViewProps) {
    const pathname = usePathname();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const query = formData.get("query") as string;
        onSearch(query);
    }

    return (
        <div className={`${styles.sidebar} ${className}`}>

            {/* Logo */}
            <div className={styles.logo}>
                <Clapperboard size={40}/>
                <h1>FleetMovies</h1>
            </div>

            {/* Search bar */}
            <form onSubmit={onSubmit} className={styles.search_bar}>
                <input type="text" name="query" placeholder="Search movies"/>
                <button type="submit">
                    {status === "loading" ? <LoaderCircle size={20} className={styles.loader}/> : <Search size={20}/>}
                </button>
            </form>

            {/* Error message */}
            {status === "error" && (
                <p className={styles.error}>An error occurred while fetching the data.</p>
            )}

            {/* No results message */}
            {status === "idle" && results.length === 0 && (
                <p className={styles.no_results}>No results found.</p>
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
                        <p className={styles.date}>{result.release_date.getFullYear()}</p>
                    </Link>
                ))}
            </div>

        </div>
    );
}


export default function Sidebar({className}: SidebarProps) {
    const data = mockMovieResults;

    return (
        <SidebarView
            status="idle"
            results={data}
            onSearch={() => {}}
            onSelect={() => {}}
            className={className}
        />
    )
};