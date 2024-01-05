import TabGroup from "@/components/TabGroup";
import React from "react";
import TabGroupCopy from "./TabGroupCopy";
// import TabGroup from "./TabGroup";

const MainSectionCopy = () => {
  return (
    <main className="relative pt-[110px] z-20">
      <div className="h-full items-center flex flex-col ">
        <TabGroupCopy />
      </div>
    </main>
  );
};

export default MainSectionCopy;
