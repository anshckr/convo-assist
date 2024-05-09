import Breadcrumbs from '@/app/components/Breadcrumbs';
import CreateCustomerForm from '@/app/ui/customers/Forms/CreateForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Customer',
};

async function Page() {
  return (
    <main className="flex h-full w-full flex-col">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/customers' },
          {
            label: 'Create Customer',
            href: '/customers/create',
            active: true,
          },
        ]}
      />
      <CreateCustomerForm />
    </main>
  );
}

export default Page;
