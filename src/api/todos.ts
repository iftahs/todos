import axios from 'axios';
import type { Todo } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodosByUser = async (userId: number): Promise<readonly Todo[]> => {
    const response = await axios.get<Todo[]>(`${BASE_URL}/todos?userId=${userId}`);
    return response.data;
};
