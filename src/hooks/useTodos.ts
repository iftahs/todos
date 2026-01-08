import { useQuery } from '@tanstack/react-query';
import { fetchTodosByUser } from '../api/todos';
import type { Todo } from '../types';

export const useTodos = (userId: number | null) => {
    return useQuery<readonly Todo[]>({
        queryKey: ['todos', userId],
        queryFn: () => fetchTodosByUser(userId!),
        enabled: !!userId,
    });
};
