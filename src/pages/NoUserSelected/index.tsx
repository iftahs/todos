import noUserImage from '../../assets/no-user-selected.png';
import styles from './styles.module.css';

export default function NoUserSelected() {
    return (
        <div className={styles.container}>
            <img
                src={noUserImage}
                alt="Select a user"
                className={styles.image}
            />
            <h2 className={styles.title}>No user selected</h2>
            <p className={styles.subtitle}>Click on a user to see the tasks</p>
        </div>
    );
}
