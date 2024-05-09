import { CustomerStatus } from '@/app/shared/types/customers';
import { Chip } from '@/app/material-tailwind';
import { useMemo } from 'react';

export function Status({ value }: { value: CustomerStatus }) {
  const color = useMemo(() => {
    switch (value) {
      case CustomerStatus.PENDING: {
        return 'amber';
      }
      case CustomerStatus.CLOSED: {
        return 'red';
      }
      default: {
        return 'green';
      }
    }
  }, [value]);

  return <Chip color={color} value={value} />;
}
