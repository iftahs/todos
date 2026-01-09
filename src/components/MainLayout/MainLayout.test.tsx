import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes, Link } from 'react-router-dom';
import MainLayout from './MainLayout';


vi.mock('../UserList', () => ({
    default: () => <div data-testid="user-list">User List Sidebar</div>
}));

describe('MainLayout Component', () => {
    it('renders sidebar and outlet content', () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<div data-testid="outlet-content">Outlet Content</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByTestId('user-list')).toBeDefined();
        expect(screen.getByTestId('outlet-content')).toBeDefined();
    });

    it('closes sidebar when navigating to a new route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={
                            <div>
                                <h1>Home</h1>
                                <Link to="/other">Go to Other</Link>
                            </div>
                        } />
                        <Route path="other" element={<h1>Other Page</h1>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );


        const burgerButton = screen.getByLabelText('Open menu');
        fireEvent.click(burgerButton);

        const sidebar = screen.getByRole('complementary');
        expect(sidebar.className).toMatch(/open/);


        const link = screen.getByText('Go to Other');
        fireEvent.click(link);


        expect(sidebar.className).not.toMatch(/open/);
    });
});
