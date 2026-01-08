import { Link } from 'react-router-dom';
import styles from '../shared/styles.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>The page you are looking for does not exist.</p>
            <Link to="/" className={styles.link}>Go back to Home</Link>
        </div>
    );
}
