import styles from "./page.module.css";
import Sidebar from "./_components/Sidebar/Sidebar";

export default function Home() {
    return (
        <div className={styles.container}>
            <Sidebar className={styles.sidebar} />
            <main className={styles.main}>
                <p>Hello</p>
            </main>
        </div>
    );
}
