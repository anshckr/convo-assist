'use client';

import useEvent from '@react-hook/event';
import { useEffect, useState } from 'react';
import { getWindow } from '../utils/browserUtils';

function useStickyState(defaultValue: any, key: string) {
  const window = getWindow();

  const [value, setValue] = useState(() => {
    if (!window) {
      return defaultValue;
    }

    const stickyValue = window.localStorage.getItem(key);

    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  // Syncing across browser tabs
  useEvent(getWindow(), 'storage', ({ key: lsKey }) => {
    if (key === lsKey) {
      if (!window) {
        setValue(defaultValue);
      } else {
        // localStorage changed for the key
        const stickyValue = window.localStorage.getItem(key);

        if (stickyValue !== null) {
          // set queries once at the time of loading
          setValue(JSON.parse(stickyValue));
        } else {
          setValue(defaultValue);
        }
      }
    }
  });

  useEffect(() => {
    const window = getWindow();

    if (window) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

export default useStickyState;
