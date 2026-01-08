import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';
import type { User } from '../types';

export const useUsers = (userId?: number) => {
    const query = useQuery<readonly User[]>({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    const selectedUserDetails = userId
        ? query.data?.find(u => u.id === userId)
        : undefined;

    return {
        ...query,
        selectedUserDetails,
    };
};
