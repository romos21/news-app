import { useState, type FC } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Input, type InputProps } from './Input';

type InputPasswordProps = Omit<InputProps, 'type'>;

export const InputPassword: FC<InputPasswordProps> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment
              position='end'
              onClick={handleShowPassword}
              sx={{ ml: 2, cursor: 'pointer' }}
            >
              {showPassword ?
                <VisibilityOff />
              : <Visibility />}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
