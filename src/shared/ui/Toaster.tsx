import type { FC, PropsWithChildren } from 'react';
import { Snackbar, Alert, IconButton, type AlertProps, type SnackbarProps, type AlertColor } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type ToasterProps = PropsWithChildren<AlertProps & Pick<SnackbarProps, 'open' | 'onClose'>>;

export type ToasterSeverity = AlertColor;

const AUTO_HIDE_DURATION = 5000;

const DEFAULT_ACTION_NODE = (
  <IconButton
    size='small'
    aria-label='close'
    color='inherit'
  >
    <CloseIcon fontSize='small' />
  </IconButton>
);

export const Toaster: FC<ToasterProps> = ({ open, onClose, children, action = DEFAULT_ACTION_NODE, ...rest }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={AUTO_HIDE_DURATION}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        {...rest}
        action={action}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};
