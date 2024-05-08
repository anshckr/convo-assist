'use server';

// import * as Sentry from "@sentry/nextjs";
import { Conversation } from '@/app/shared/types/conversations';
import {
  getConversations,
  writeConversations,
} from '@/app/shared/utils/conversations';
import { revalidatePath } from 'next/cache';

import { v4 as uuidv4 } from 'uuid';

export async function createConversation(conversation: Conversation) {
  try {
    const fileConversations = await getConversations();

    const newConversation = {
      ...conversation,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    fileConversations.push(newConversation);

    await writeConversations(JSON.stringify(fileConversations, null, 2));

    revalidatePath('/');

    return {
      error: '',
      message: 'Successfully created Conversation',
    };
  } catch (error) {
    console.error(error);

    return {
      error: 'Failed to create conversation',
      message: 'Failed to create conversation',
    };
  }
}

export async function updateConversation(id: string, data: Conversation) {
  try {
    let fileConversations = await getConversations();

    fileConversations = fileConversations.map((conversation: Conversation) => {
      if (conversation.id === id) {
        return {
          ...conversation,
          status: data.status,
          messages: data.messages,
          customer: data.customer,
        };
      }

      return conversation;
    });

    await writeConversations(JSON.stringify(fileConversations, null, 2));

    revalidatePath('/');

    return {
      error: '',
      message: 'Successfully updated Conversation',
    };
  } catch (error) {
    console.error(error);

    return {
      error: 'Failed to update Conversation',
      message: 'Failed to update Conversation',
    };
  }
}

export async function deleteConversation(id: string) {
  try {
    let fileConversations = await getConversations();

    fileConversations = fileConversations.filter(
      (conversation: Conversation) => {
        return conversation.id !== id;
      },
    );

    await writeConversations(JSON.stringify(fileConversations, null, 2));

    revalidatePath('/');
  } catch (error) {
    console.error(error);

    return {
      error: 'Failed to delete Conversation',
      message: 'Failed to delete Conversation',
    };
  }
}
