import styles from "./layout.module.css";
import Sidebar from "./_components/Sidebar/Sidebar";
import { Suspense } from "react";
import getTrendingMovies from "../api/get-trending-movies/wrapper.server";
import { adaptTrendingMoviesResponse } from "./_components/Sidebar/adapters";
import { MovieResult } from "./_components/Sidebar/SidebarView";

export default async function Layout({children}: {children: React.ReactNode}) {

    const { data } = await getTrendingMovies();

    let trendingMovies: MovieResult[] = [];
    if (data) {
        trendingMovies = adaptTrendingMoviesResponse(data);
    }

    return (
        <div className={styles.container}>
            <Suspense>
                <Sidebar initialList={trendingMovies}/>
            </Suspense>
            {children}
        </div>
    )
};