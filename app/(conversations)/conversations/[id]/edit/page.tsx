import Breadcrumbs from '@/app/components/Breadcrumbs';
import { fetchConversationById } from '@/app/lib/data/conversations';
import EditConversationForm from '@/app/ui/conversations/Forms/EditForm';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

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
    title: `Edit Conversation - ${conversation.id}`,
  };
}

async function Page({ params }: Props) {
  const id = params.id;
  const conversation = await fetchConversationById(id);

  if (!conversation) {
    notFound();
  }

  return (
    <main className="flex h-full flex-col">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Conversations', href: '/' },
          {
            label: `Edit Conversation (${conversation.id})`,
            href: `/conversations/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditConversationForm conversation={conversation} />
    </main>
  );
}

export default Page;
