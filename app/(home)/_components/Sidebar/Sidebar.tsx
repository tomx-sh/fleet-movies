'use client'
import searchMovies from "@/app/api/search-movies/wrapper";
import adaptMovieSearchResponse from "./adapter";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SidebarViewProps } from "./SidebarView";
import { MovieResult } from "./SidebarView";
import SidebarView from "./SidebarView";


/**
 * This component fetches movie data from the TMDB API based on a search query.
 * It is composed of a logo, a search bar, and a list of search results, or potential error messages.
 * Search query is handled in the URL query param. This allows the user to share search results with friends.
 */
export default function Sidebar() {
    const router = useRouter();
    const [status, setStatus] = useState<SidebarViewProps['status']>('initial');
    const [data, setData] = useState<MovieResult[]>([])
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    // When the user submits the search form, update the URL query param
    const handleSearch = (query: string) => {
        router.push(`?query=${query}`);
    }

    // Fetch movies from the API
    // useCallback is not necessary anymore with React 19!
    const search = async (query: string | null) => {
        if (!query) {
            setStatus('initial');
            setData([]);
            return;
        }
        
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

    // When URL query param changes (or on first mount), search for movies
    // (This is one use case where fetching data in a useEffect is appropriate)
    useEffect(() => {search(query)}, [query]);

    return (
        <SidebarView
            status={status}
            results={data}
            onSearch={handleSearch}
        />
    )
};