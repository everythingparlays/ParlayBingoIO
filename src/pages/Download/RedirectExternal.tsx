// RedirectExternal.js or RedirectExternal.tsx
import { useEffect } from 'react';
import React from 'react';

const RedirectExternal = ({ to }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return <div>Redirecting...</div>;
};

export default RedirectExternal;