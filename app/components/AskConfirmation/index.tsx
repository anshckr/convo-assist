import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from '@/app/material-tailwind';

import React, { MouseEvent, ReactNode, useCallback, useState } from 'react';
import { useFormStatus } from 'react-dom';

const ConfirmButton = ({ btnText }: { btnText: string }) => {
  const { pending } = useFormStatus();

  const handleConfirmClick = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.stopPropagation();
    },
    [],
  );

  return (
    <Button
      variant="gradient"
      color="blue"
      type="submit"
      disabled={pending}
      loading={pending}
      onClick={handleConfirmClick}
    >
      <span>{btnText}</span>
    </Button>
  );
};

interface Props {
  formAction: () => void;
  title?: string;
  render: (
    onRequestConfirmation: (e?: any) => void,
    onDoneConfirmation: (e?: any) => void,
  ) => ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmBtnText?: string;
  cancelBtnText?: string;
  children: ReactNode;
}

const AskConfirmation: React.FC<Props> = ({
  formAction,
  title,
  render,
  children,
  onConfirm,
  onCancel,
  confirmBtnText = 'Confirm',
  cancelBtnText = 'Cancel',
}) => {
  const [open, setOpen] = useState(false);

  const onRequestConfirmation = useCallback(() => {
    setOpen(true);
  }, []);

  const onDoneConfirmation = useCallback(() => {
    setOpen(false);
  }, []);

  const onCancelConfirmation = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.stopPropagation();

      onDoneConfirmation();

      onCancel?.();
    },
    [onCancel, onDoneConfirmation],
  );

  const onConfirmConfirmation = useCallback(() => {
    onDoneConfirmation();

    onConfirm?.();
  }, [onConfirm, onDoneConfirmation]);

  const toggleOpenDialog = useCallback(() => {
    setOpen((prevOpen) => {
      return !prevOpen;
    });
  }, []);

  const confirmActionOnSubmit = useCallback(() => {
    formAction();

    onConfirmConfirmation();
  }, [formAction, onConfirmConfirmation]);

  return (
    <>
      {render(onRequestConfirmation, onDoneConfirmation)}

      <Dialog open={open} handler={toggleOpenDialog} size="sm" className="p-4">
        {title && <DialogHeader className="p-2">{title}</DialogHeader>}

        <DialogBody className="p-2 font-normal">{children}</DialogBody>
        <DialogFooter className="p-2">
          <Button
            variant="text"
            color="red"
            onClick={onCancelConfirmation}
            className="mr-4"
          >
            <span>{cancelBtnText}</span>
          </Button>
          <form action={confirmActionOnSubmit}>
            <ConfirmButton btnText={confirmBtnText} />
          </form>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AskConfirmation;
