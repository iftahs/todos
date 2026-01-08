import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Todo from './Todo';
import type { Todo as TodoType } from '../../types';

describe('Todo Component', () => {
    const mockTodo: TodoType = {
        id: 1,
        userId: 1,
        title: 'Test Todo Item',
        completed: false,
    };

    it('renders the todo title', () => {
        render(<Todo todo={mockTodo} />);
        expect(screen.getByText('Test Todo Item')).toBeDefined();
    });
});
