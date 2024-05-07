import { ConversationStatus } from '@/app/shared/types/conversations';
import { Chip } from '@/app/material-tailwind';
import { useMemo } from 'react';

export function Status({ value }: { value: ConversationStatus }) {
  const color = useMemo(() => {
    switch (value) {
      case ConversationStatus.PENDING: {
        return 'amber';
      }
      case ConversationStatus.CLOSED: {
        return 'red';
      }
      default: {
        return 'green';
      }
    }
  }, [value]);

  return <Chip color={color} value={value} />;
}
