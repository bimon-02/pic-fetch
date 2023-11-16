import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react'

const TabList = () => {
    const tabs = [
      {
        key: "all",
        display: "All",
      },
      {
        key: "landscapes",
        display: "Landscapes",
      },
      {
        key: "portraits",
        display: "Portraits",
      },
    ];
  return (
    <Tab.List className="flex items-center gap-12">
      {tabs.map((tab) => (
        <Tab key={tab.key} className="p-2">
          {({ selected }) => (
            <span
              className={classNames(
                "uppercase text-lg",
                selected ? "text-white" : "text-stone-600"
              )}
            >
              {tab.display}
            </span>
          )}
        </Tab>
      ))}
    </Tab.List>
  );
}

export default TabList