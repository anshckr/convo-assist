"use client";

import { Card } from "@/app/material-tailwind";
import { Conversation } from "@/app/shared/types/conversations";
import {
  DeleteConversation,
  UpdateConversation,
} from "@/app/ui/conversations/CRUDButtons";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useCallback } from "react";
import { TableVirtuoso } from "react-virtuoso";

interface Props {
  conversations: Conversation[];
}

const VirtualisedList: React.FC<Props> = ({ conversations }) => {
  const router = useRouter();

  const handleRowClick = useCallback((event: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>) => {
    const { id } = event.currentTarget.dataset;

    router.push(`/conversations/${id}`);
  }, [router]);

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
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg cursor-pointer hover:bg-slate-50"
              />
            )
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
            <th scope="col" className="w-1/4 py-5 pl-6 pr-3 font-medium">
              Customer Name
            </th>
            <th scope="col" className="w-1/4 py-5 pl-6 pr-3 font-medium">
              Status
            </th>
            <th scope="col" className="w-1/4 py-5 pl-6 pr-3 font-medium">
              Started At
            </th>
            <th scope="col" className="relative w-1/4 py-3 pl-6 pr-3">
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
