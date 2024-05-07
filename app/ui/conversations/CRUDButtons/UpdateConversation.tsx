import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { MouseEvent, useCallback } from 'react';

export function UpdateConversation({ id }: { id: string }) {
  const handleEditConversationClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
      event.stopPropagation();
    },
    [],
  );

  return (
    <Link
      href={`/conversations/${id}/edit`}
      className="rounded-md border p-2 hover:bg-blue-400"
      onClick={handleEditConversationClick}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
