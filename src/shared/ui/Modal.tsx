import MuiDialog, { type DialogProps } from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import { memo, Suspense, type FC, type PropsWithChildren } from 'react';
import { Divider } from './Divider';
import { Backdrop } from './Loaders';

interface ModalProps extends DialogProps {
  open: boolean;
  onClose: () => void;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = memo(({ onClose, open, title, sx, children, ...rest }) => {
  return (
    <Suspense fallback={<Backdrop open />}>
      <MuiDialog
        open={open}
        onClose={onClose}
        {...rest}
      >
        {title && (
          <>
            <MuiDialogTitle>{title}</MuiDialogTitle>
            <Divider />
          </>
        )}
        <MuiDialogContent sx={{ mt: 4 }}>{children}</MuiDialogContent>
      </MuiDialog>
    </Suspense>
  );
});
