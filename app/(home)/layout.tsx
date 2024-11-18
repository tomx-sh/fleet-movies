import styles from "./layout.module.css";
import Sidebar from "./_components/Sidebar/Sidebar";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className={styles.container}>
            <Sidebar className={styles.sidebar} />
            {children}
        </div>
    )
};