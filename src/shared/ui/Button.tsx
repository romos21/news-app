import { styled } from '@mui/material';
import MuiButton, { type ButtonProps } from '@mui/material/Button';
export * from '@mui/material/Button';
import MuiIconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router';
export * from '@mui/material/IconButton';

export const Button = MuiButton;

export const IconButton = MuiIconButton;

interface ButtonLinkProps extends Omit<ButtonProps, 'href'> {
  to: string;
  state?: unknown;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ to, state, children, ...buttonProps }) => {
  return (
    <Button
      component={NavLink}
      to={to}
      state={state}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};
