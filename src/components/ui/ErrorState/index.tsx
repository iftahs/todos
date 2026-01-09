import styles from './styles.module.css';

interface ErrorStateProps {
    readonly message: string;
    readonly title?: string;
}

export const ErrorState = ({ message, title = 'Something went wrong' }: ErrorStateProps) => {
    return (
        <div className={styles.error} role="alert">
            <div className={styles.title}>{title}</div>
            <div className={styles.message}>{message}</div>
        </div>
    );
};
