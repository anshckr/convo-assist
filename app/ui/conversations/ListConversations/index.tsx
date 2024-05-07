import { fetchFilteredConversations } from '@/app/lib/data/conversations';
import EmptyList from './EmptyList';
import VirtualisedList from './VirtualisedList';

interface Props {
  query: string;
  currentPage: number;
}

export default async function ListConversations({ query, currentPage }: Props) {
  const conversations = await fetchFilteredConversations(query, currentPage);

  if (!conversations.length) {
    return <EmptyList />;
  }

  return <VirtualisedList conversations={conversations} />;
}
