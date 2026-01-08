import { useUserTasks } from '../../hooks/useUserTasks';
import TodoList from '../../components/Todo/TodoList';
import { Button } from '../../components/ui/Button';
import styles from './styles.module.css';

export default function UserTasks() {
    const {
        user,
        numericUserId,
        isUserLoading,
        hideCompleted,
        toggleHideCompleted,
        onBack,
        isInvalidId,
    } = useUserTasks();

    if (isInvalidId) {
        return <div className={styles.container}>Invalid User ID</div>;
    }

    if (!isUserLoading && !user) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.actions}>
                    <Button onClick={onBack}>
                        ← Back to Users
                    </Button>
                </div>
                <h1 className={`${styles.title} gradient-text`}>
                    {isUserLoading ? 'Loading User...' : `${user?.name}'s Todos`}
                </h1>
            </div>

            <TodoList
                userId={numericUserId}
                hideCompleted={hideCompleted}
                onToggleHideCompleted={toggleHideCompleted}
            />
        </div>
    );
}
