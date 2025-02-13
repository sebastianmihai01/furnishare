import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'contained', ...props }) => {
  return (
    <MuiButton
      variant={variant}
      sx={{
        textTransform: 'none',
        borderRadius: 2,
        ...props.sx
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;