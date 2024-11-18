'use client';
import { mockMovieResults } from "./mock-data";
import styles from "./sidebar.module.css";


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
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const query = formData.get("query") as string;
        onSearch(query);
    }

    return (
        <div className={`${styles.sidebar} ${className}`}>

            <form onSubmit={onSubmit}>
                <input type="text" name="query" placeholder="Search movies"/>
                <button type="submit">Search</button>
            </form>

            <div className={styles.results__container}>
                {results.map(result => (
                    <div key={result.id} className={styles.result}>
                        <p>{result.title}</p>
                        <p>{result.release_date.getFullYear()}</p>
                    </div>
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
            className={className}
        />
    )
};