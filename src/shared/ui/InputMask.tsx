import { type ChangeEvent, forwardRef } from 'react';
import { Input, type InputProps } from './Input';
import { IMaskInput, type IMaskInputProps } from 'react-imask';

const PHONE_MASK = '+{7} (000) 000-00-00';

const DEFINITIONS = {
  '#': /[0-9]/,
  A: /[A-Za-z]/,
  N: /[A-Za-z0-9]/,
};

interface InputMaskProps extends Omit<InputProps, 'onChange'> {
  mask?: string;
  definitions?: Record<string, RegExp>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  ({ name, onChange, mask = PHONE_MASK, definitions = DEFINITIONS, ...rest }, ref) => {
    const handleAccept = (value: string): void => {
      if (!name || !onChange) return;
      const event = {
        target: {
          name,
          value,
          type: 'change',
        },
      } as ChangeEvent<HTMLInputElement>;
      onChange(event);
    };

    return (
      <Input
        {...rest}
        name={name}
        InputProps={{
          // @ts-ignore - MUI пока не имеет полной типизации для кастомных input компонентов
          inputComponent: IMaskInput,
          inputProps: {
            mask,
            definitions,
            overwrite: true,
            onAccept: handleAccept,
            inputRef: ref,
          } as IMaskInputProps<HTMLInputElement>,
        }}
      />
    );
  },
);

InputMask.displayName = 'InputMask';
