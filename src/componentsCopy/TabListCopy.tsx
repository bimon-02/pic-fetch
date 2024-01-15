import { Tab } from "@headlessui/react";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { list, ref } from "firebase/storage";
import { storage } from "@/config/firebase";

interface TabListCopyProps {
  setCategory: (category: string) => void;
  setViewOption: React.Dispatch<React.SetStateAction<string>>;
}

const TabListCopy: React.FC<TabListCopyProps> = ({
  setCategory,
  setViewOption,
}) => {
  const [subfolders, setSubfolders] = useState<string[]>([]);
  const maxContentWidth = window.innerWidth < 1029 ? 350 : undefined;

  useEffect(() => {
    const fetchSubfolders = async () => {
      try {
        const photoDirectoryRef = ref(storage, "photo");
        const photoItems = await list(photoDirectoryRef);
        const subfolderNames = photoItems.prefixes.map((prefix) =>
          prefix.name.replace("photo/", "")
        );
        setSubfolders(subfolderNames);
      } catch (error) {
        console.error("Error fetching subfolders:", error);
        // Handle the error here, e.g., set an error state variable
      }
    };

    fetchSubfolders();
  }, []);

  const handleTabClick = (tab: string) => {
    setCategory(tab);
    setViewOption("category"); // Set the view option to 'category' when a tab is clicked
  };

  return (
    <div style={{ overflow: "auto", maxWidth: maxContentWidth }}>
      <Tab.List className="flex items-center ">
        {["all", ...subfolders].map((tab) => (
          <Tab key={tab} className="p-2">
            {({ selected }) => (
              <span
                className={classNames(
                  "uppercase text-lg",
                  selected ? "text-white" : "text-stone-600"
                )}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </span>
            )}
          </Tab>
        ))}
      </Tab.List>
    </div>
  );
};

export default TabListCopy;
