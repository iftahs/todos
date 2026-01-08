import axios from 'axios';
import type { User } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<readonly User[]> => {
    const response = await axios.get<User[]>(`${BASE_URL}/users`);
    return response.data;
};


