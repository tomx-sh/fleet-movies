import styles from "./layout.module.css";
import Sidebar from "./_components/Sidebar/Sidebar";
import { Suspense } from "react";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className={styles.container}>
            <Suspense>
                <Sidebar/>
            </Suspense>
            {children}
        </div>
    )
};