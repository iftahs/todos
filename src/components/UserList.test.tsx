import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserList from './UserList';
import * as useUsersHook from '../hooks/useUsers';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../hooks/useUsers');
const mockedUseUsers = vi.mocked(useUsersHook.useUsers);

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('UserList Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state', () => {
        mockedUseUsers.mockReturnValue({
            isLoading: true,
            isError: false,
            data: undefined,
            error: null,
            isSuccess: false,
        } as unknown as ReturnType<typeof useUsersHook.useUsers>);

        render(<UserList />, { wrapper: BrowserRouter });
        expect(screen.getByRole('status')).toBeDefined();
    });

    it('renders error state', () => {
        mockedUseUsers.mockReturnValue({
            isLoading: false,
            isError: true,
            error: new Error('Failed to fetch'),
            data: undefined,
            isSuccess: false,
        } as unknown as ReturnType<typeof useUsersHook.useUsers>);

        render(<UserList />, { wrapper: BrowserRouter });
        expect(screen.getByText(/Error loading users/i)).toBeDefined();
    });

    it('renders list of users', () => {
        const mockUsers = [
            { id: 1, name: 'User 1', username: 'user1', email: 'user1@example.com' },
            { id: 2, name: 'User 2', username: 'user2', email: 'user2@example.com' },
        ];

        mockedUseUsers.mockReturnValue({
            isLoading: false,
            isError: false,
            data: mockUsers,
            error: null,
            isSuccess: true,
        } as unknown as ReturnType<typeof useUsersHook.useUsers>);

        render(<UserList />, { wrapper: BrowserRouter });

        expect(screen.getByText('User 1')).toBeDefined();
        expect(screen.getByText('User 2')).toBeDefined();
    });

    it('navigates to user tasks on click', () => {
        const mockUsers = [
            { id: 1, name: 'User 1', username: 'user1', email: 'user1@example.com' },
        ];

        mockedUseUsers.mockReturnValue({
            isLoading: false,
            isError: false,
            data: mockUsers,
            error: null,
            isSuccess: true,
        } as unknown as ReturnType<typeof useUsersHook.useUsers>);

        render(<UserList />, { wrapper: BrowserRouter });

        fireEvent.click(screen.getByText('User 1'));
        expect(mockNavigate).toHaveBeenCalledWith('/users/1/tasks');
    });
});
