import type { ChangeEvent, FC, PropsWithChildren } from 'react';
import { useColorScheme } from '@mui/material/styles';
import type { Mode } from './types';

export const ThemeSwitcher: FC<PropsWithChildren> = () => {
  const { mode, setMode } = useColorScheme();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMode(event.target.value as Mode);
  };

  if (!mode) {
    return null;
  }

  return (
    <select
      value={mode}
      onChange={onChange}
    >
      <option value='system'>System</option>
      <option value='light'>Light</option>
      <option value='dark'>Dark</option>
    </select>
  );
};
