import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const STORAGE_KEY = 'todo_filter_hide_completed';

export const useFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize from session storage or URL params (URL params take precedence)
    const [hideCompleted, setHideCompleted] = useState(() => {
        const paramValue = searchParams.get('hideCompleted');
        if (paramValue !== null) {
            return paramValue === 'true';
        }
        const storageValue = sessionStorage.getItem(STORAGE_KEY);
        return storageValue === 'true';
    });

    // Update session storage when state changes
    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, String(hideCompleted));

        const currentHideCompleted = searchParams.get('hideCompleted') === 'true';

        // Only update URL if state mismatch
        if (hideCompleted !== currentHideCompleted) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                if (hideCompleted) {
                    newParams.set('hideCompleted', 'true');
                } else {
                    newParams.delete('hideCompleted');
                }
                return newParams;
            }, { replace: true });
        }
    }, [hideCompleted, searchParams, setSearchParams]);

    const toggleHideCompleted = () => {
        setHideCompleted(prev => !prev);
    };

    return {
        hideCompleted,
        toggleHideCompleted,
    };
};
