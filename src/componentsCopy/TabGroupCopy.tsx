// TabGroupCopy.tsx
import { Tab } from "@headlessui/react";
import React, { useState } from "react";
import TabListCopy from "./TabListCopy";
import TabPannelsCopy from "./TabPannelsCopy";

const TabGroupCopy = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewOption, setViewOption] = useState<string>("all");

  return (
    <Tab.Group>
      <TabListCopy
        setCategory={setSelectedCategory}
        setViewOption={setViewOption}
      />

      <TabPannelsCopy category={selectedCategory} viewOption={viewOption} />
    </Tab.Group>
  );
};

export default TabGroupCopy;
