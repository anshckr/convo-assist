'use client';

import { List, ListItem, Typography } from '@/app/material-tailwind';
import { Customer } from '@/app/shared/types/customers';
import EmptyCustomerMessagesList from './EmptyCustomerMessagesList';

interface Props {
  customer: Customer;
}

const CustomerDetails: React.FC<Props> = ({ customer }) => {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className={'mb-2 flex items-center text-xl md:text-2xl'}>
        Customer Name:
        <Typography className="ml-2" variant="h3" color="blue-gray">
          {customer.name}
        </Typography>
      </div>
      {customer.contacts.length > 0 ? (
        <>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Contacts:
          </h2>
          <ul className="max-w-md list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400">
            {customer.contacts.map((contact) => {
              return <li key={contact}>{contact}</li>;
            })}
          </ul>
        </>
      ) : (
        <EmptyCustomerMessagesList />
      )}
    </div>
  );
};

export default CustomerDetails;
