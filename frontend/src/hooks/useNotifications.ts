import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { addNotification, removeNotification } from '../stores/slices/uiSlice';

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.ui.notifications);

  const showNotification = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      dispatch(addNotification({ message, type }));
    },
    [dispatch]
  );

  const hideNotification = useCallback(
    (id: string) => {
      dispatch(removeNotification(id));
    },
    [dispatch]
  );

  return {
    notifications,
    showNotification,
    hideNotification,
  };
}; 