'use client';

import { Card, Typography } from '@/app/material-tailwind';
import { Conversation } from '@/app/shared/types/conversations';
import {
  DeleteConversation,
  UpdateConversation,
} from '@/app/ui/conversations/CRUDButtons';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useCallback, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import sortBy from 'lodash/sortBy';

interface Props {
  conversations: Conversation[];
}

const VirtualisedList: React.FC<Props> = ({
  conversations: propsConverstaions,
}) => {
  const router = useRouter();

  const [conversations, setConversations] = useState(propsConverstaions);

  const [sortedByKey, setSortedByKey] = useState<string>('');

  const handleRowClick = useCallback(
    (event: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>) => {
      const { id } = event.currentTarget.dataset;

      router.push(`/conversations/${id}`);
    },
    [router],
  );

  const handleSorting = useCallback(
    (event: MouseEvent<HTMLTableCellElement, globalThis.MouseEvent>) => {
      const sortKey = event.currentTarget.dataset.sortkey as string;

      setConversations((prevConversations) => {
        if (sortedByKey === sortKey) {
          // toggle on same key
          return [...prevConversations].reverse();
        }

        return sortBy([...prevConversations], function (o) {
          return o[sortKey as keyof Conversation];
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
        data={conversations}
        fixedHeaderContent={() => (
          <tr className="bg-gray-200">
            <th
              scope="col"
              className="w-1/4 cursor-pointer border-y bg-slate-50/50 p-4 py-5 pl-6 pr-3 font-medium transition-colors hover:bg-slate-50"
              data-sortkey="customer"
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
              className="w-1/4 cursor-pointer border-y bg-slate-50/50 p-4 py-5 pl-6 pr-3 font-medium transition-colors hover:bg-slate-50"
              data-sortkey="status"
              onClick={handleSorting}
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
              >
                Status <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
              </Typography>
            </th>
            <th
              scope="col"
              className="w-1/4 cursor-pointer border-y bg-slate-50/50 p-4 py-5 pl-6 pr-3 font-medium transition-colors hover:bg-slate-50"
              data-sortkey="createdAt"
              onClick={handleSorting}
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
              >
                Started At{' '}
                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
              </Typography>
            </th>
            <th
              scope="col"
              className="w-1/4 border-y bg-slate-50/50 p-4 py-5 pl-6 pr-3 font-medium transition-colors hover:bg-slate-50"
            >
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        )}
        itemContent={(_, conversation: Conversation) => {
          return (
            <>
              <td className="w-1/4 whitespace-nowrap py-3 pl-6 pr-3">
                <p>{conversation.customer}</p>
              </td>
              <td className="w-1/4 whitespace-nowrap py-3 pl-6 pr-3">
                <p>{conversation.status}</p>
              </td>
              <td className="w-1/4 whitespace-nowrap py-3 pl-6 pr-3">
                <p>{conversation.createdAt}</p>
              </td>
              <td className="w-1/4 whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center justify-end gap-3">
                  <UpdateConversation id={conversation.id} />
                  <DeleteConversation conversation={conversation} />
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
