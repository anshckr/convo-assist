import Breadcrumbs from '@/app/components/Breadcrumbs';
import { fetchCustomerById } from '@/app/lib/data/customers';
import EditCustomerForm from '@/app/ui/customers/Forms/EditForm';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { customerId: string };
}

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
    title: `Edit Customer - ${customer.id}`,
  };
}

async function Page({ params }: Props) {
  const { customerId } = params;
  const customer = await fetchCustomerById(customerId);

  if (!customer) {
    notFound();
  }

  return (
    <main className="flex h-full flex-col">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/' },
          {
            label: `Edit Customer (${customer.id})`,
            href: `/customers/${customerId}/edit`,
            active: true,
          },
        ]}
      />
      <EditCustomerForm customer={customer} />
    </main>
  );
}

export default Page;
