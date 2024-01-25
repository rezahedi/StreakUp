"use client"
import * as Dialog from '@radix-ui/react-dialog';
import { deleteUser } from '@/app/lib/actions';
import './UserDeleteDialog.css';
import { useEffect, useState } from 'react';

type Props = {
  trigger?: React.ReactNode;
  id: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

export default function UserDeleteDialog({
  trigger = <button className="Button violet">Edit profile</button>,
  id,
  open,
  setOpen
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
    setLoading(false);
  }, [open]);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setError(false);
    setLoading(true);
    let res = await deleteUser(id);
    setLoading(false);

    if ( res === false )
      setError(true);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Remove My Data</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            All your data and your account will be permanently removed, Are you sure?
          </Dialog.Description>
          <div className='flex gap-4 mt-6 justify-end'>
            <button className="Button red cursor-pointer disabled:cursor-default" disabled={loading} onClick={(e) => {handleDelete(e)}}>Yes, Delete</button>
            <Dialog.Close asChild>
              <button className="Button cursor-pointer">Cancel</button>
            </Dialog.Close>
          </div>
          {loading && <p className='mt-4 text-green-500 text-center'>Please wait while we delete your account</p>}
          {error && <p className='mt-4 text-red-500 text-center'>Something went wrong, please try again</p>}
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <svg viewBox="0 0 24 24">
                <path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z"/>
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}