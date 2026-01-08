import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchUsers } from './users';
import type { User } from '../types';

vi.mock('axios');

describe('fetchUsers', () => {
    it('should fetch users successfully', async () => {
        const mockUsers: User[] = [
            { id: 1, name: 'John Doe', email: 'john@example.com', address: { street: 'Main St', city: 'NY', zipcode: '10001', geo: { lat: '0', lng: '0' } }, phone: '123', website: 'com', company: { name: 'Co', catchPhrase: 'phrase', bs: 'bs' }, username: 'johndoe' },
        ];
        (axios.get as any).mockResolvedValue({ data: mockUsers });

        const result = await fetchUsers();

        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
        expect(result).toEqual(mockUsers);
    });

    it('should handle errors', async () => {
        const errorMessage = 'Network Error';
        (axios.get as any).mockRejectedValue(new Error(errorMessage));

        await expect(fetchUsers()).rejects.toThrow(errorMessage);
    });
});
