import type { InputBaseComponentProps } from '@mui/material/InputBase';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import type { ElementType, FC } from 'react';

export type InputProps = Omit<TextFieldProps, 'error' | 'helperText'> & {
  error?: string;
};
export type InputBaseComponent = ElementType<InputBaseComponentProps>;

export const Input: FC<InputProps> = ({ error, ...rest }) => {
  return (
    <TextField
      {...rest}
      error={!!error}
      helperText={error}
    />
  );
};
