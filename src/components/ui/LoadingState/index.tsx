import styles from './styles.module.css';

interface LoadingStateProps {
    readonly className?: string;
}

export const LoadingState = ({ className = '' }: LoadingStateProps) => {
    return (
        <div className={`${styles.container} ${className}`}>
            <span className={styles.loader} aria-label="Loading..." role="status"></span>
        </div>
    );
};
