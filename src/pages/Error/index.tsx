import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import styles from '../shared/styles.module.css';

export default function ErrorPage() {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText || error.data?.message || 'Unknown error';
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Oops!</h1>
            <p className={styles.message}>Sorry, an unexpected error has occurred.</p>
            <p className={styles.message}>
                <i>{errorMessage}</i>
            </p>
            <Link to="/" className={styles.link}>Go Home</Link>
        </div>
    );
}
