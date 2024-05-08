'use client';

import {
  Timeline,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from '@/app/material-tailwind';
import { Conversation, Sender } from '@/app/shared/types/conversations';
import { BugAntIcon, UserIcon } from '@heroicons/react/24/outline';
import EmptyConversationMessagesList from './EmptyConversationMessagesList';
import { clsx } from 'clsx';
import { Status } from './Status';

interface Props {
  conversation: Conversation;
}

const ConversationDetails: React.FC<Props> = ({ conversation }) => {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className={'mb-2 flex items-center text-xl md:text-2xl'}>
        Conversation With:
        <Typography className="ml-2" variant="h3" color="blue-gray">
          {conversation.customer}
        </Typography>
      </div>
      <div className={'mb-4 flex text-xl md:text-2xl'}>
        <Typography className="mr-2" variant="h4" color="blue-gray">
          Status:
        </Typography>
        <Status value={conversation.status} />
      </div>
      {conversation.messages.length > 0 ? (
        <Timeline className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          {conversation.messages.map((message, index) => {
            const isCustomer = message.sender === Sender.CUSTOMER;
            const date = new Date(message.sentAt);

            const formatter = new Intl.DateTimeFormat('en-US', {
              dateStyle: 'full',
              timeStyle: 'long',
            });

            const formattedTime = formatter.format(date);

            return (
              <TimelineItem key={message.sentAt} className={'h-28'}>
                {index < conversation.messages.length - 1 ? (
                  <TimelineConnector className="!w-[78px]" />
                ) : null}
                <TimelineHeader
                  className={clsx(
                    'relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5',
                    {
                      'flex-row-reverse': !isCustomer,
                    },
                  )}
                >
                  <TimelineIcon className="p-3" variant="ghost" color="green">
                    {isCustomer ? (
                      <UserIcon className="h-5 w-5" />
                    ) : (
                      <BugAntIcon className="h-5 w-5" />
                    )}
                  </TimelineIcon>
                  <div className="flex flex-col gap-1">
                    <Typography variant="h6" color="blue-gray">
                      {message.content}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {formattedTime}
                    </Typography>
                  </div>
                </TimelineHeader>
              </TimelineItem>
            );
          })}
        </Timeline>
      ) : (
        <EmptyConversationMessagesList />
      )}
    </div>
  );
};

export default ConversationDetails;
