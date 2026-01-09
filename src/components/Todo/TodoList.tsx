import noTasksImage from '../../assets/no-tasks-funny.png';
import { useTodos } from '../../hooks/useTodos';
import Todo from './Todo';
import { Checkbox } from '../ui/Checkbox';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';
import styles from './styles.module.css';

interface TodoListProps {
    readonly userId: number;
    readonly hideCompleted: boolean;
    readonly onToggleHideCompleted: () => void;
}

export default function TodoList({ userId, hideCompleted, onToggleHideCompleted }: TodoListProps) {
    const { data: todos, isLoading, isError, error } = useTodos(userId);

    if (isLoading) {
        return <LoadingState />;
    }

    if (isError) {
        return (
            <div className={styles.container}>
                <ErrorState
                    title="Error loading todos"
                    message={error instanceof Error ? error.message : 'Error loading todos'}
                />
            </div>
        );
    }

    if (!todos || todos.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyState}>
                    <img
                        src={noTasksImage}
                        alt="No tasks found"
                        style={{ maxWidth: '300px', marginBottom: '1rem' }}
                    />
                    <p>No tasks found for this user.</p>
                </div>
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
