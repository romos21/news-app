import MuiSelect, { type SelectProps as MuiSelectProps } from '@mui/material/Select';
import type { ChangeEvent, FC } from 'react';
import { Container } from './Container';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

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

export const Select: FC<SelectProps> = ({ error, options, name, value, label, ...rest }) => {
  const isError = !!error;

  return (
    <Container>
      <InputLabel id={`${name}-label}`}>{label}</InputLabel>
      <MuiSelect
        id={name}
        labelId={`${name}-label}`}
        value={value || ''}
        label={label}
        name={name}
        fullWidth
        error={isError}
        {...rest}
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
