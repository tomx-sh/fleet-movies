import { LoaderCircle } from "lucide-react";
import styles from "./loading.module.css";

/**
 * This is the loading page for when a movie is being fetched.
 */
export default function Loading() {
    return (
        <LoaderCircle size={50} className={styles.loader}/>
    );
}