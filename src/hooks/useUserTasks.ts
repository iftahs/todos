import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUsers } from './useUsers';
import { useFilters } from './useFilters';

export const useUserTasks = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const numericUserId = Number(userId);

    const { hideCompleted, toggleHideCompleted } = useFilters();
    const { selectedUserDetails: user, isLoading: isUserLoading } = useUsers(numericUserId);

    useEffect(() => {
        if (!isUserLoading && !user) {
            navigate('/');
        }
    }, [isUserLoading, user, navigate]);

    const onBack = () => navigate('/');

    return {
        user,
        numericUserId,
        isUserLoading,
        hideCompleted,
        toggleHideCompleted,
        onBack,
        isInvalidId: !numericUserId
    };
};
