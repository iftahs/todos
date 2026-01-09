import { useParams } from 'react-router-dom';
import { useUserTasks } from '../../hooks/useUserTasks';
import TodoList from '../../components/Todo/TodoList';
import styles from './styles.module.css';

function UserTasksContent() {
    const {
        user,
        numericUserId,
        isUserLoading,
        hideCompleted,
        toggleHideCompleted,
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

export default function UserTasks() {
    const { userId } = useParams();
    return <UserTasksContent key={userId} />;
}
