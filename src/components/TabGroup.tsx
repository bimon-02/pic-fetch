import { Tab } from '@headlessui/react';
import React from 'react'
import TabList from './TabList';
import TabPannels from './TabPannels';

const TabGroup = () => {
  return (
    <Tab.Group>
      <TabList />
      <TabPannels />
    </Tab.Group>
  );
}

export default TabGroup