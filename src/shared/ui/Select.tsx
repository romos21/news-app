import MuiSelect, { type SelectProps as MuiSelectProps } from '@mui/material/Select';
import type { ChangeEvent, FC } from 'react';
import { Container } from './Container';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';

export type SelectChangeEvent<Value = unknown> =
  | ChangeEvent<HTMLInputElement>
  | (Event & { target: { value: Value; name: string } });

export type SelectOption<Value = string> = {
  value: Value;
  label: string;
};

export type SelectProps = Omit<MuiSelectProps, 'error' | 'helperText'> & {
  error?: string;
  options: SelectOption[];
};

export const Select: FC<SelectProps> = ({ error, options, ...rest }) => {
  const isError = !!error;

  return (
    <Container>
      <MuiSelect
        {...rest}
        error={isError}
      >
        {options.map(({ value, label }) => (
          <MenuItem
            id={`${label}_${value}`}
            value={value}
          >
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
      {isError && <FormHelperText>{error}</FormHelperText>}
    </Container>
  );
};
