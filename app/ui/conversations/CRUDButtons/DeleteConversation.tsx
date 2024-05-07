'use client';

import AskConfirmation from '@/app/components/AskConfirmation';
import { deleteConversation } from '@/app/lib/actions/conversations';
import { Conversation } from '@/app/shared/types/conversations';
import { TrashIcon } from '@heroicons/react/24/outline';
import { MouseEvent, useCallback, useRef } from 'react';

export function DeleteConversation({
  conversation,
}: {
  conversation: Conversation;
}) {
  const deleteConversationWithId = deleteConversation.bind(
    null,
    conversation.id,
  );

  const onRequestConfirmationRef = useRef(() => {});

  const handleDeleteConversationClick = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.stopPropagation();

      onRequestConfirmationRef.current();
    },
    [],
  );

  return (
    <AskConfirmation
      formAction={deleteConversationWithId}
      render={(onRequestConfirmation) => {
        onRequestConfirmationRef.current = onRequestConfirmation;

        return (
          <button
            onClick={handleDeleteConversationClick}
            className="rounded-md border p-2 hover:bg-red-400"
          >
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
          </button>
        );
      }}
    >
      Are you sure you want to delete the conversation -{' '}
      <strong>{`${conversation.id}`}</strong>?
    </AskConfirmation>
  );
}
