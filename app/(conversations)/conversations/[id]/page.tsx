import Breadcrumbs from '@/app/components/Breadcrumbs';
import { fetchConversationById } from '@/app/lib/data/conversations';
import ConversationDetails from '@/app/ui/conversations';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type MetaProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const conversation = await fetchConversationById(params.id);

  if (!conversation) {
    notFound();
  }

  return {
    title: `Conversation - ${conversation.id}`,
  };
}

type Props = {
  params: { id: string };
};

async function ConversationPage({ params }: Props) {
  const conversation = await fetchConversationById(params.id);

  if (!conversation) {
    notFound();
  }

  return (
    <main className="flex h-full flex-col">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Conversations', href: '/' },
          {
            label: `Conversation (${params.id})`,
            href: `/conversations/${params.id}`,
            active: true,
          },
        ]}
      />
      <ConversationDetails conversation={conversation} />
    </main>
  );
}

export default ConversationPage;
