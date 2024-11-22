import styles from "./Row.module.css"
import Link from "next/link"
import Image from "next/image";

// If no poster is available, use a blank image
const blankImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

export interface RowProps {
    title: string;
    releaseDate?: Date;
    posterUrl?: string;
    href: string;
    active?: boolean;
    voteAverage?: number;
    voteCount?: number;
}

/**
 * A row in the list of search results. It displays the movie's title, release date, and poster.
 */
export default function Row({ href, title,  releaseDate, active=false, posterUrl=blankImage, voteAverage, voteCount }: RowProps) {

    const roundedVoteAverage = voteAverage ? Math.round(voteAverage * 10) / 10 : "N/A";

    return (
        <Link
            href={href}
            className={styles.result_link + (active ? ` ${styles.active}` : "")}
        >
            <Image src={posterUrl} alt={title} width={50} height={75} className={styles.poster} />

            <div>
                <p className={styles.title}>{title}</p>
                <p className={styles.vote_average}>{roundedVoteAverage + "/10"}</p>
                <p className={styles.vote_count}>{`(${voteCount})`}</p>
            </div>

            
            {/*<p className={styles.date}>{releaseDate?.getFullYear() || "Unknown"}</p>*/}
        </Link>
    )
}