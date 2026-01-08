import type { Todo as TodoType } from '../../types';
import { Checkbox } from '../ui/Checkbox';
import styles from './styles.module.css';

interface TodoProps {
    readonly todo: TodoType;
}

export default function Todo({ todo }: TodoProps) {
    return (
        <div className={styles.todoItem}>
            <Checkbox
                checked={todo.completed}
                onChange={() => { }}
                aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            <span className={`${styles.todoText} ${todo.completed ? styles.completedText : ''}`}>
                {todo.title}
            </span>
        </div>
    );
}
