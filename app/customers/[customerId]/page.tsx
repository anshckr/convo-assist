import Breadcrumbs from '@/app/components/Breadcrumbs';
import { fetchCustomerById } from '@/app/lib/data/customers';
import CustomerDetails from '@/app/ui/customers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type MetaProps = {
  params: { customerId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const customer = await fetchCustomerById(params.customerId);

  if (!customer) {
    notFound();
  }

  return {
    title: `Customer - ${customer.id}`,
  };
}

type Props = {
  params: { customerId: string };
};

async function CustomerPage({ params }: Props) {
  const customer = await fetchCustomerById(params.customerId);

  if (!customer) {
    notFound();
  }

  return (
    <main className="flex h-full flex-col">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/customers' },
          {
            label: `Customer (${params.customerId})`,
            href: `/customers/${params.customerId}`,
            active: true,
          },
        ]}
      />
      <CustomerDetails customer={customer} />
    </main>
  );
}

export default CustomerPage;
