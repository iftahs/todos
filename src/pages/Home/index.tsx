import UserList from '../../components/UserList';
import styles from './styles.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h1 className={`${styles.title} gradient-text`}>Users</h1>
                <UserList />
            </div>
        </div>
    );
}
