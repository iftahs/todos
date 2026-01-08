import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import styles from './UserList.module.css';

export default function UserList() {
    const { data: users, isLoading, isError, error } = useUsers();
    const navigate = useNavigate();

    if (isLoading) {
        return <div className={styles.loading}>Loading users...</div>;
    }

    if (isError) {
        return (
            <div className={styles.error}>
                Error loading users: {error instanceof Error ? error.message : 'Unknown error'}
            </div>
        );
    }

    if (!users || users.length === 0) {
        return <div className={styles.empty}>No users found.</div>;
    }

    const handleUserClick = (userId: number) => {
        navigate(`/users/${userId}/tasks`);
    };

    return (
        <div className={styles.grid}>
            {users.map((user) => (
                <Card
                    key={user.id}
                    interactive
                    onClick={() => handleUserClick(user.id)}
                >
                    <span className={styles.username}>@{user.username}</span>
                    <h3 className={styles.name}>{user.name}</h3>
                    <span className={styles.email}>{user.email}</span>
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        handleUserClick(user.id);
                    }}>Show TODOs</Button>
                </Card>
            ))}
        </div>
    );
}
