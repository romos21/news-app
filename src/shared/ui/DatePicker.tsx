import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DatePicker as MuiDatePicker,
  type DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import type { FC } from 'react';
import { dateManager, type DateManager } from '@/shared/dateManager';

type DatePickerProps = Omit<MuiDatePickerProps, 'onChange'> & {
  onChange: (value: string | null) => void;
};

export const DatePicker: FC<DatePickerProps> = ({ value, onChange, ...props }) => {
  const handleChange = (value: DateManager | null) => {
    onChange(value ? value.toISOString() : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <MuiDatePicker
          {...props}
          value={value ? dateManager(value) : null}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
