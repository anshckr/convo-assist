'use client';

import { Card } from '@/app/material-tailwind';
import React from 'react';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { CreateCustomer } from '../CRUDButtons';

const EmptyList: React.FC = () => {
  return (
    <Card className="flex h-full w-full flex-col items-center justify-center">
      <FaceFrownIcon className="h-10 w-10 text-gray-700" />
      <span className="text-md mb-4 mt-2 font-medium">
        No Customers Found...
      </span>
      <CreateCustomer />
    </Card>
  );
};

export default EmptyList;
