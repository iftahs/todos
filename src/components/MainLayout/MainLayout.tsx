import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import UserList from '../UserList';
import styles from './MainLayout.module.css';
import menuIcon from '../../assets/menu.svg';

export default function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const [prevPathname, setPrevPathname] = useState(location.pathname);

    if (location.pathname !== prevPathname) {
        setPrevPathname(location.pathname);
        setIsSidebarOpen(false);
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.burgerButton}
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open menu"
            >
                <img src={menuIcon} alt="Menu" />
            </button>

            <div
                className={`${styles.overlay} ${isSidebarOpen ? styles.open : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <UserList />
            </aside>
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
}
