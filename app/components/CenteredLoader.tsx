import { Spinner } from '@/app/material-tailwind';
import React from 'react';

interface Props {
  spinnerClasses?: string;
}

const CenteredLoader: React.FC<Props> = ({ spinnerClasses }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner className={`h-6 w-6 ${spinnerClasses}`} />
    </div>
  );
};

export default CenteredLoader;
