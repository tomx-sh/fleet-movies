'use client'
import searchMovies from "@/app/api/search-movies/wrapper.client";
import { adaptMovieSearchResponse } from "./adapters";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SidebarViewProps } from "./SidebarView";
import { MovieResult } from "./SidebarView";
import SidebarView from "./SidebarView";


interface SidebarProps {
    initialList?: MovieResult[];
}


/**
 * This component fetches movie data from the TMDB API based on a search query.
 * It is composed of a logo, a search bar, and a list of search results, or potential error messages.
 * Search query is handled in the URL query param. This allows the user to share search results with friends.
 */
export default function Sidebar({ initialList }: SidebarProps) {
    const router = useRouter();
    const [status, setStatus] = useState<SidebarViewProps['status']>('initial');
    const [data, setData] = useState<MovieResult[]>(initialList || []);
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || undefined;

    // When the user submits the search form, update the URL query param
    const handleSearch = (query: string) => {
        const newSearchParams = new URLSearchParams({ query: query });
        router.push(`?${newSearchParams.toString()}`);
    }

    // Fetch movies from the API
    const search = useCallback(async (query: string | undefined) => {
        if (!query) {
            setStatus('initial');
            setData(initialList || []);
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
    }, [initialList]);

    // When URL query param changes (or on first mount), search for movies
    // (This is one use case where fetching data in a useEffect is appropriate)
    useEffect(() => {search(query)}, [query, search]);

    return (
        <SidebarView
            status={status}
            results={data}
            onSearch={handleSearch}
            initialQuery={query}
        />
    )
};