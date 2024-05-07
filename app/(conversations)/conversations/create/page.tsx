import Breadcrumbs from '@/app/components/Breadcrumbs';
import CreateConversationForm from '@/app/ui/conversations/Forms/CreateForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Conversation',
};

async function Page() {
  return (
    <main className="flex h-full w-full flex-col">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Conversations', href: '/' },
          {
            label: 'Create Conversation',
            href: '/conversations/create',
            active: true,
          },
        ]}
      />
      <CreateConversationForm />
    </main>
  );
}

export default Page;
