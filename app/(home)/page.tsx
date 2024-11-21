import { Clapperboard } from "lucide-react";
import styles from "./page.module.css";

/**
 * This page is the default content for the home route.
 */
export default function Home() {
    return (
        <main className={styles.main}>
            <Clapperboard size={40} />
            <h1>Welcome to the Fleet Movie Database</h1>
        </main>
    );
}
