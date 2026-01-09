import { useState, useEffect } from 'react';

const STORAGE_KEY_PREFIX = 'todo_filter_hide_completed_';

export const useFilters = (userId?: number) => {
    const storageKey = userId ? `${STORAGE_KEY_PREFIX}${userId}` : null;

    const [hideCompleted, setHideCompleted] = useState(() => {
        if (!storageKey) return false;
        const stored = sessionStorage.getItem(storageKey);
        return stored === 'true';
    });

    useEffect(() => {
        if (!storageKey) return;
        sessionStorage.setItem(storageKey, String(hideCompleted));
    }, [hideCompleted, storageKey]);

    const toggleHideCompleted = () => {
        setHideCompleted((prev) => !prev);
    };

    return {
        hideCompleted,
        toggleHideCompleted,
    };
};
