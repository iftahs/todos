import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useUsers } from './useUsers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as usersApi from '../api/users';

vi.mock('../api/users');

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useUsers', () => {
    it('fetches users successfully', async () => {
        const mockUsers = [{ id: 1, name: 'User 1' }];
        (usersApi.fetchUsers as any).mockResolvedValue(mockUsers);

        const { result } = renderHook(() => useUsers(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockUsers);
    });

    it('returns selected user details', async () => {
        const mockUsers = [
            { id: 1, name: 'User 1' },
            { id: 2, name: 'User 2' },
        ];
        (usersApi.fetchUsers as any).mockResolvedValue(mockUsers);

        const { result } = renderHook(() => useUsers(1), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.selectedUserDetails).toEqual(mockUsers[0]);
    });
});
