import { Spinner } from '@heroui/react';
import React from 'react';

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}
