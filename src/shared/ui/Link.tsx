import React from 'react';
import { NavLink } from 'react-router';
import { Button, type ButtonProps } from './Button';

interface ButtonLinkProps extends Omit<ButtonProps, 'href'> {
  to: string;
  state?: unknown;
}

export const Link: React.FC<ButtonLinkProps> = ({ to, state, children, ...buttonProps }) => {
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
