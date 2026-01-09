import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUsers } from './useUsers';
import { useFilters } from './useFilters';

export const useUserTasks = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();

    const numericUserId = userId && /^\d+$/.test(userId) ? Number(userId) : NaN;
    const isInvalidId = Number.isNaN(numericUserId);

    const { hideCompleted, toggleHideCompleted } = useFilters(isInvalidId ? undefined : numericUserId);
    const { selectedUserDetails: user, isLoading: isUserLoading } = useUsers(isInvalidId ? undefined : numericUserId);

    useEffect(() => {
        if (isInvalidId) {
            navigate('/', { replace: true });
        } else if (!isUserLoading && !user) {
            navigate('/', { replace: true });
        }
    }, [isInvalidId, isUserLoading, user, navigate]);

    const onBack = () => navigate('/');

    return {
        user,
        numericUserId,
        isUserLoading,
        hideCompleted,
        toggleHideCompleted,
        onBack,
        isInvalidId
    };
};
