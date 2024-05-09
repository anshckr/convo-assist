import CenteredLoader from '@/app/components/CenteredLoader';
import Pagination from '@/app/components/Pagination';
import Search from '@/app/components/Search';
import { fetchCustomersCount } from '@/app/lib/data/customers';
import { CreateCustomer } from '@/app/ui/customers/CRUDButtons';
import ListCustomers from '@/app/ui/customers/ListCustomers';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customers',
};

async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersCount(query);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between gap-2">
        <Search placeholder="Search customer by customer name..." />
        <CreateCustomer />
      </div>
      <div className="mt-4 w-full flex-1">
        <Suspense key={query + currentPage} fallback={<CenteredLoader />}>
          <ListCustomers query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Page;
