import React from 'react'
import TabGroup from './TabGroup';

const MainSection = () => {
  return (
    <main className="relative pt-[110px] z-20">
      <div className="flex flex-col h-full items-center">
        <TabGroup />
      </div>
    </main>
  );
}

export default MainSection