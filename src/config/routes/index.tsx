import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../components/MainLayout/MainLayout';
import NoUserSelected from '../../pages/NoUserSelected';
import UserTasks from '../../pages/UserTasks';
import NotFound from '../../pages/NotFound';
import ErrorPage from '../../pages/Error';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <NoUserSelected />,
            },
            {
                path: 'users/:userId/tasks',
                element: <UserTasks />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);
