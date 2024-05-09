import { fetchFilteredCustomers } from '@/app/lib/data/customers';
import EmptyList from './EmptyList';
import VirtualisedList from './VirtualisedList';

interface Props {
  query: string;
  currentPage: number;
}

export default async function ListCustomers({ query, currentPage }: Props) {
  const customers = await fetchFilteredCustomers(query, currentPage);

  if (!customers.length) {
    return <EmptyList />;
  }

  return <VirtualisedList customers={customers} />;
}
