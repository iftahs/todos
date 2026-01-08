import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchTodosByUser } from './todos';
import type { Todo } from '../types';

vi.mock('axios');

describe('fetchTodosByUser', () => {
    it('should fetch todos for a specific user', async () => {
        const mockTodos: Todo[] = [
            { id: 1, userId: 1, title: 'Todo 1', completed: false },
        ];
        (axios.get as any).mockResolvedValue({ data: mockTodos });

        const userId = 1;
        const result = await fetchTodosByUser(userId);

        expect(axios.get).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
        expect(result).toEqual(mockTodos);
    });

    it('should handle errors', async () => {
        const errorMessage = 'Network Error';
        (axios.get as any).mockRejectedValue(new Error(errorMessage));

        await expect(fetchTodosByUser(1)).rejects.toThrow(errorMessage);
    });
});
