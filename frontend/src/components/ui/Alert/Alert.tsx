import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';

interface AlertProps extends Omit<MuiAlertProps, 'ref'> {
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children, ...props }) => {
  return <MuiAlert elevation={6} variant="filled" {...props}>{children}</MuiAlert>;
};

export default Alert; 