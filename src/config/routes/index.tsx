import { createBrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import UserTasks from '../../pages/UserTasks';
import NotFound from '../../pages/NotFound';
import ErrorPage from '../../pages/Error';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/users/:userId/tasks',
        element: <UserTasks />,
        errorElement: <ErrorPage />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);
