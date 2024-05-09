'use client';

import { Card, Typography } from '@/app/material-tailwind';
import { Customer } from '@/app/shared/types/customers';
import { DeleteCustomer, UpdateCustomer } from '@/app/ui/customers/CRUDButtons';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import sortBy from 'lodash/sortBy';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useCallback, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';

interface Props {
  customers: Customer[];
}

const VirtualisedList: React.FC<Props> = ({ customers: propsCustomers }) => {
  const router = useRouter();

  const [customers, setCustomers] = useState(propsCustomers);

  const [sortedByKey, setSortedByKey] = useState<string>('');

  const handleRowClick = useCallback(
    (event: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>) => {
      const { id } = event.currentTarget.dataset;

      router.push(`/customers/${id}`);
    },
    [router],
  );

  const handleSorting = useCallback(
    (event: MouseEvent<HTMLTableCellElement, globalThis.MouseEvent>) => {
      const sortKey = event.currentTarget.dataset.sortkey as string;

      setCustomers((prevCustomers) => {
        if (sortedByKey === sortKey) {
          // toggle on same key
          return [...prevCustomers].reverse();
        }

        return sortBy([...prevCustomers], function (o) {
          return o[sortKey as keyof Customer];
        });
      });

      setSortedByKey(sortKey);
    },
    [sortedByKey],
  );

  return (
    <Card className="h-full w-full overflow-scroll">
      <TableVirtuoso
        components={{
          Table: (props) => (
            <table
              {...props}
              className="min-w-full table-fixed text-gray-900"
            />
          ),
          TableRow: (props) => {
            return (
              <tr
                {...props}
                onClick={handleRowClick}
                data-id={props.item.id}
                className="w-full cursor-pointer border-b py-3 text-sm last-of-type:border-none hover:bg-slate-50 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              />
            );
          },
          TableHead: React.forwardRef(function TableHead(props, ref) {
            return (
              <thead
                {...props}
                ref={ref}
                className="rounded-lg text-left text-sm"
              />
            );
          }),
        }}
        className="h-full text-gray-900"
        data={customers}
        fixedHeaderContent={() => (
          <tr className="bg-gray-200">
            <th
              scope="col"
              className="w-2/5 cursor-pointer border-y bg-slate-50/50 p-4 py-5 pl-6 pr-3 font-medium transition-colors hover:bg-slate-50"
              data-sortkey="name"
              onClick={handleSorting}
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
              >
                Customer Name{' '}
                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
              </Typography>
            </th>
            <th
              scope="col"
              className="w-2/5 cursor-pointer border-y bg-slate-50/50 p-4 py-5 pl-6 pr-3 font-medium transition-colors hover:bg-slate-50"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
              >
                Contacts
              </Typography>
            </th>
            <th
              scope="col"
              className="w-1/5 border-y bg-slate-50/50 p-4 py-5 pl-6 pr-3 font-medium transition-colors hover:bg-slate-50"
            >
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        )}
        itemContent={(_, customer: Customer) => {
          return (
            <>
              <td className="w-2/5 whitespace-nowrap py-3 pl-6 pr-3">
                <p>{customer.name}</p>
              </td>
              <td className="w-2/5 whitespace-nowrap py-3 pl-6 pr-3">
                <ul>
                  {customer.contacts.map((contact) => {
                    return <li key={contact}>{contact}</li>;
                  })}
                </ul>
              </td>
              <td className="w-1/5 whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center justify-end gap-3">
                  <UpdateCustomer id={customer.id} />
                  <DeleteCustomer customer={customer} />
                </div>
              </td>
            </>
          );
        }}
      />
    </Card>
  );
};

export default VirtualisedList;
