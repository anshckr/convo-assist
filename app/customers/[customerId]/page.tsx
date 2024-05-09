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

  return <CustomerDetails customer={customer} />;
}

export default CustomerPage;
