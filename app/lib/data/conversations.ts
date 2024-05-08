'use server';

import { Conversation } from '@/app/shared/types/conversations';
// import * as Sentry from "@sentry/nextjs";
import { unstable_noStore as noStore } from 'next/cache';

import { promises as fs } from 'fs';
import path from 'path';

let conversationFilePath = path.join(
  process.cwd(),
  'public/conversations.json',
);

const ITEMS_PER_PAGE = 20;
export async function fetchFilteredConversations(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const file = await fs.readFile(conversationFilePath, 'utf8');
    const fileConversations = JSON.parse(file) || [];

    const conversations = fileConversations
      .filter((conversation: Conversation) => {
        if (query) {
          return conversation.customer.includes(query);
        }

        return true;
      })
      .slice(offset, ITEMS_PER_PAGE);

    return conversations as Conversation[];
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch Conversations.');
  }
}

export async function fetchConversationsCount(query: string) {
  noStore();

  try {
    const file = await fs.readFile(conversationFilePath, 'utf8');
    const fileConversations = JSON.parse(file) || [];

    const conversationsCount = fileConversations.filter(
      (conversation: Conversation) => {
        if (query) {
          return conversation.customer.includes(query);
        }

        return true;
      },
    ).length;

    return Math.ceil(conversationsCount / ITEMS_PER_PAGE);
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch Conversations.');
  }
}

export async function fetchConversationById(id: string) {
  noStore();

  try {
    const file = await fs.readFile(conversationFilePath, 'utf8');
    const fileConversations = JSON.parse(file) || [];

    const conversation = fileConversations.find(
      (conversation: Conversation) => {
        return conversation.id === id;
      },
    );

    return conversation as Conversation;
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch Conversation.');
  }
}
