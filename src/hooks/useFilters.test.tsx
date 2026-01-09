import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFilters } from './useFilters';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={children} />
            </Routes>
        </MemoryRouter>
    );
};

describe('useFilters', () => {
    beforeEach(() => {
        sessionStorage.clear();
        vi.clearAllMocks();
    });

    afterEach(() => {
        sessionStorage.clear();
    });

    it('defaults to show all tasks (hideCompleted=false) when no storage', () => {
        const { result } = renderHook(() => useFilters(1), {
            wrapper: createWrapper(),
        });

        expect(result.current.hideCompleted).toBe(false);
    });

    it('loads persisted state for a specific user', async () => {
        const userId = 1;
        sessionStorage.setItem(`todo_filter_hide_completed_${userId}`, 'true');

        const { result } = renderHook(() => useFilters(userId), {
            wrapper: createWrapper(),
        });


        await waitFor(() => expect(result.current.hideCompleted).toBe(true));
    });

    it('does NOT load persisted state from a different user', async () => {
        const userId = 2;
        const otherUserId = 1;
        sessionStorage.setItem(`todo_filter_hide_completed_${otherUserId}`, 'true');

        const { result } = renderHook(() => useFilters(userId), {
            wrapper: createWrapper(),
        });


        expect(result.current.hideCompleted).toBe(false);
    });

    it('persists state changes for specific user', async () => {
        const userId = 1;
        const { result } = renderHook(() => useFilters(userId), {
            wrapper: createWrapper(),
        });

        act(() => {
            result.current.toggleHideCompleted();
        });


        await waitFor(() => expect(result.current.hideCompleted).toBe(true));


        expect(sessionStorage.getItem(`todo_filter_hide_completed_${userId}`)).toBe('true');
    });

    it('resets state when switching to a user without preference', async () => {

        const user1Id = 1;
        const user2Id = 2;
        sessionStorage.setItem(`todo_filter_hide_completed_${user1Id}`, 'true');


        const { result } = renderHook(() => useFilters(user2Id), {
            wrapper: createWrapper(),
        });

        expect(result.current.hideCompleted).toBe(false);
    });

    it('updates storage when toggled and does NOT revert', async () => {
        const userId = 1;
        sessionStorage.setItem(`todo_filter_hide_completed_${userId}`, 'true');

        const { result } = renderHook(() => useFilters(userId), {
            wrapper: createWrapper(),
        });


        await waitFor(() => expect(result.current.hideCompleted).toBe(true));


        act(() => {
            result.current.toggleHideCompleted();
        });


        await waitFor(() => expect(result.current.hideCompleted).toBe(false));


        expect(sessionStorage.getItem(`todo_filter_hide_completed_${userId}`)).toBe('false');
    });
});
