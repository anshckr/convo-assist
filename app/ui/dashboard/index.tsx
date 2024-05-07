'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';
import SideNav from './SideNav';

interface Props {
  children: React.ReactNode;
}

const CONTEXT_CLASSES = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-gray-600',
  warning: 'bg-orange-600',
  default: 'bg-indigo-400',
  dark: 'bg-white-600 font-gray-300',
};

const Dashboard: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-8">{children}</div>
      <ToastContainer
        position="top-right"
        toastClassName={(context) =>
          CONTEXT_CLASSES[context?.type || 'default'] +
          ' relative flex p-1 mb-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        bodyClassName={() =>
          'text-sm font-white font-med whitespace-pre-line p-3 max-h-[300px] overflow-y-auto'
        }
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        autoClose={5 * 1000}
        icon={false}
      />
    </div>
  );
};

export default Dashboard;
