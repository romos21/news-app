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
          startAdornment: (
            <InputAdornment
              position='end'
              onClick={handleShowPassword}
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
