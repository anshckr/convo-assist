'use server';

// import * as Sentry from "@sentry/nextjs";
import { Conversation } from '@/app/shared/types/conversations';
import { revalidatePath } from 'next/cache';

import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export async function createConversation(conversation: Conversation) {
  try {
    const file = await fs.readFile(
      process.cwd() + '/app/conversations.json',
      'utf8',
    );
    const fileConversations = JSON.parse(file) || [];

    const newConversation = {
      ...conversation,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    fileConversations.push(newConversation);

    await fs.writeFile(
      process.cwd() + '/app/conversations.json',
      JSON.stringify(fileConversations, null, 2),
    );

    revalidatePath('/');

    return {
      error: '',
      message: 'Successfully created Conversation',
    };
  } catch (error) {
    // Sentry.captureException(error);

    return {
      error: 'Failed to create Conversation',
      message: 'Failed to create Conversation',
    };
  }
}

export async function updateConversation(id: string, data: Conversation) {
  try {
    const file = await fs.readFile(
      process.cwd() + '/app/conversations.json',
      'utf8',
    );

    let fileConversations = JSON.parse(file) || [];

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

    await fs.writeFile(
      process.cwd() + '/app/conversations.json',
      JSON.stringify(fileConversations, null, 2),
    );

    revalidatePath('/');

    return {
      error: '',
      message: 'Successfully updated Conversation',
    };
  } catch (error) {
    // Sentry.captureException(error);

    return {
      error: 'Failed to update Conversation',
      message: 'Failed to update Conversation',
    };
  }
}

export async function deleteConversation(id: string) {
  try {
    const file = await fs.readFile(
      process.cwd() + '/app/conversations.json',
      'utf8',
    );

    let fileConversations = JSON.parse(file) || [];

    fileConversations = fileConversations.filter(
      (conversation: Conversation) => {
        return conversation.id !== id;
      },
    );

    await fs.writeFile(
      process.cwd() + '/app/conversations.json',
      JSON.stringify(fileConversations, null, 2),
    );

    revalidatePath('/');
  } catch (error) {
    // Sentry.captureException(error);

    return {
      error: 'Failed to delete Conversation',
      message: 'Failed to delete Conversation',
    };
  }
}
