'use client';

import AskConfirmation from '@/app/components/AskConfirmation';
import { deleteCustomer } from '@/app/lib/actions/customers';
import { Customer } from '@/app/shared/types/customers';
import { TrashIcon } from '@heroicons/react/24/outline';
import { MouseEvent, useCallback, useRef } from 'react';

export function DeleteCustomer({ customer }: { customer: Customer }) {
  const deleteCustomerWithId = deleteCustomer.bind(null, customer.id);

  const onRequestConfirmationRef = useRef(() => {});

  const handleDeleteCustomerClick = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.stopPropagation();

      onRequestConfirmationRef.current();
    },
    [],
  );

  return (
    <AskConfirmation
      formAction={deleteCustomerWithId}
      render={(onRequestConfirmation) => {
        onRequestConfirmationRef.current = onRequestConfirmation;

        return (
          <button
            onClick={handleDeleteCustomerClick}
            className="rounded-md border p-2 hover:bg-red-400"
          >
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
          </button>
        );
      }}
    >
      Are you sure you want to delete the customer -{' '}
      <strong>{`${customer.id}`}</strong>?
    </AskConfirmation>
  );
}
