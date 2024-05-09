import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { MouseEvent, useCallback } from 'react';

export function UpdateCustomer({ id }: { id: string }) {
  const handleEditCustomerClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
      event.stopPropagation();
    },
    [],
  );

  return (
    <Link
      href={`/customers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-blue-400"
      onClick={handleEditCustomerClick}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
