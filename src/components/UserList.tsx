import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { Card } from './ui/Card';
import styles from './UserList.module.css';
import { LoadingState } from './ui/LoadingState';
import { ErrorState } from './ui/ErrorState';

export default function UserList() {
    const { data: users, isLoading, isError, error } = useUsers();
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();

    if (isLoading) {
        return <LoadingState />;
    }

    if (isError) {
        return (
            <ErrorState
                title="Error loading users"
                message={error instanceof Error ? error.message : 'Unknown error'}
            />
        );
    }

    if (!users || users.length === 0) {
        return <div className={styles.empty}>No users found.</div>;
    }

    const handleUserClick = (id: number) => {
        navigate(`/users/${id}/tasks`);
    };

    return (
        <div className={styles.grid}>
            {users.map((user) => {
                const isActive = Number(userId) === user.id;
                return (
                    <div
                        key={user.id}
                        className={isActive ? styles.activeCardWrapper : ''}
                    >
                        <Card
                            interactive
                            onClick={() => handleUserClick(user.id)}
                            className={`${styles.card} ${isActive ? styles.active : ''}`}
                        >
                            <span className={styles.username}>@{user.username}</span>
                            <h3 className={styles.name}>{user.name}</h3>
                            <span className={styles.email}>{user.email}</span>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}
