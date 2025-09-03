import MuiBackdrop from '@mui/material/Backdrop';
import MuiCircularProgress from '@mui/material/CircularProgress';
import type { FC } from 'react';
import { Container } from './Container';
export * from '@mui/material/Backdrop';

export const CircularProgress = MuiCircularProgress;

export const AbsoluteCircularProgress: FC = () => {
  return (
    <Container
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      display='flex'
      flexDirection='column'
      justifyContent='flex-start'
      alignItems='center'
    >
      <CircularProgress />
    </Container>
  );
};

export const Backdrop: FC<{ open: boolean }> = ({ open }) => {
  return (
    <MuiBackdrop open={open}>
      <CircularProgress color='inherit' />
    </MuiBackdrop>
  );
};
