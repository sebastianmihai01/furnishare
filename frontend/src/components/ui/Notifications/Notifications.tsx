import React from 'react';
import { Alert, Snackbar, Stack } from '@mui/material';

interface NotificationsProps {
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  return (
    <Stack spacing={2} sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000 }}>
      {notifications.map((notification) => (
        <Snackbar key={notification.id} open={true} autoHideDuration={6000}>
          <Alert severity={notification.type}>{notification.message}</Alert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default Notifications; 