import React from 'react';
import BodyNav from './BodyNav';
import DisplaySection from './DisplaySection';

export default () => {
  return (
    <div className="w-full flex align-center p-4 space-x-4">
      <BodyNav />
      <DisplaySection />
    </div>
  );
};
