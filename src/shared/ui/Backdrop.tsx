import MuiBackdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import type { FC } from 'react';
export * from '@mui/material/Backdrop';

export const Backdrop: FC<{ open: boolean }> = ({ open }) => {
  return (
    <MuiBackdrop open={open}>
      <CircularProgress color='inherit' />
    </MuiBackdrop>
  );
};
