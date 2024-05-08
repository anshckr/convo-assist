'use server';

import { Conversation } from '@/app/shared/types/conversations';
import { getConversations } from '@/app/shared/utils/conversations';
// import * as Sentry from "@sentry/nextjs";
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 20;
export async function fetchFilteredConversations(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const fileConversations = await getConversations();

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
    const fileConversations = await getConversations();

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
    const fileConversations = await getConversations();

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
