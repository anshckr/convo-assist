'use client';

import { Card } from '@/app/material-tailwind';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import React from 'react';

const EmptyCustomerMessagesList: React.FC = () => {
  return (
    <Card className="flex h-full w-full flex-col items-center justify-center">
      <FaceFrownIcon className="h-10 w-10 text-gray-700" />
      <div className="text-md mb-4 mt-2 w-[350px] text-center font-medium">
        <div className="whitespace-nowrap">No messages found...</div>
      </div>
    </Card>
  );
};

export default EmptyCustomerMessagesList;
