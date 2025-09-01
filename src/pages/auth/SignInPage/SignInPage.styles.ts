import { styled } from '@mui/material/styles';

export const FormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  margin: `${theme.spacing(4)} auto`,
  maxWidth: '680px',
  alignItems: 'stretch',
  [theme.breakpoints.down('sm')]: {
    margin: `${theme.spacing(2)} auto`,
    gap: theme.spacing(2),
    maxWidth: '100%',
  },
}));
