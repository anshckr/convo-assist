'use client';

import { Card } from '@/app/material-tailwind';
import Image from 'next/image';
import React from 'react';

const EmptyConversationMessagesList: React.FC = () => {
  return (
    <Card className="flex h-full w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/no-nlp-queries.svg"
        alt="No messages"
        width={50}
        height={50}
        className="flex items-center justify-between"
      />
      <div className="text-md mb-4 mt-2 w-[350px] text-center font-medium">
        <div className="whitespace-nowrap">No messages found...</div>
      </div>
    </Card>
  );
};

export default EmptyConversationMessagesList;
