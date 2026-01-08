import { useTodos } from '../../hooks/useTodos';
import Todo from './Todo';
import { Checkbox } from '../ui/Checkbox';
import styles from './styles.module.css';

interface TodoListProps {
    readonly userId: number;
    readonly hideCompleted: boolean;
    readonly onToggleHideCompleted: () => void;
}

export default function TodoList({ userId, hideCompleted, onToggleHideCompleted }: TodoListProps) {
    const { data: todos, isLoading, isError, error } = useTodos(userId);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyState}>Loading tasks...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.container}>
                <div className={`${styles.emptyState} ${styles.error}`}>
                    {error instanceof Error ? error.message : 'Error loading todos'}
                </div>
            </div>
        );
    }

    if (!todos || todos.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyState}>No tasks found for this user.</div>
            </div>
        );
    }

    const filteredTodos = hideCompleted
        ? todos.filter((todo) => !todo.completed)
        : todos;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Tasks</h2>
                <Checkbox
                    label="Hide completed"
                    checked={hideCompleted}
                    onChange={onToggleHideCompleted}
                />
            </div>

            <div className={styles.list}>
                {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => <Todo key={todo.id} todo={todo} />)
                ) : (
                    <div className={styles.emptyState}>All tasks completed!</div>
                )}
            </div>
        </div>
    );
}
