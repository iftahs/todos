import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoList from './TodoList';
import * as useTodosHook from '../../hooks/useTodos';

type UseTodosReturnType = ReturnType<typeof useTodosHook.useTodos>;

vi.mock('../../hooks/useTodos');
const mockedUseTodos = vi.mocked(useTodosHook.useTodos);

describe('TodoList Component', () => {
    it('renders loading state', () => {
        mockedUseTodos.mockReturnValue({
            isLoading: true,
            isError: false,
            data: undefined,
            error: null,
            isSuccess: false,
        } as unknown as UseTodosReturnType);

        render(<TodoList userId={1} hideCompleted={false} onToggleHideCompleted={() => { }} />);
        expect(screen.getByRole('status')).toBeDefined();
    });

    it('renders error state', () => {
        mockedUseTodos.mockReturnValue({
            isLoading: false,
            isError: true,
            error: new Error('Failed to load'),
            data: undefined,
            isSuccess: false,
        } as unknown as UseTodosReturnType);

        render(<TodoList userId={1} hideCompleted={false} onToggleHideCompleted={() => { }} />);
        expect(screen.getByText(/Error loading todos/i)).toBeDefined();
    });

    it('renders empty state with image when no tasks', () => {
        mockedUseTodos.mockReturnValue({
            isLoading: false,
            isError: false,
            data: [],
            isSuccess: true,
            error: null,
        } as unknown as UseTodosReturnType);

        render(<TodoList userId={1} hideCompleted={false} onToggleHideCompleted={() => { }} />);


        const image = screen.getByAltText('No tasks found');
        expect(image).toBeDefined();
        expect(image.getAttribute('src')).toContain('no-tasks-funny.png');
    });

    it('renders list of todos', () => {
        const mockTodos = [
            { id: 1, userId: 1, title: 'Task 1', completed: false },
            { id: 2, userId: 1, title: 'Task 2', completed: true },
        ];

        mockedUseTodos.mockReturnValue({
            isLoading: false,
            isError: false,
            data: mockTodos,
            isSuccess: true,
            error: null,
        } as unknown as UseTodosReturnType);

        render(<TodoList userId={1} hideCompleted={false} onToggleHideCompleted={() => { }} />);

        expect(screen.getByText('Task 1')).toBeDefined();
        expect(screen.getByText('Task 2')).toBeDefined();
    });

    it('filters completed tasks', () => {
        const mockTodos = [
            { id: 1, userId: 1, title: 'Task 1', completed: false },
            { id: 2, userId: 1, title: 'Task 2', completed: true },
        ];

        mockedUseTodos.mockReturnValue({
            isLoading: false,
            isError: false,
            data: mockTodos,
            isSuccess: true,
            error: null,
        } as unknown as UseTodosReturnType);

        render(<TodoList userId={1} hideCompleted={true} onToggleHideCompleted={() => { }} />);

        expect(screen.getByText('Task 1')).toBeDefined();
        expect(screen.queryByText('Task 2')).toBeNull();
    });
});
