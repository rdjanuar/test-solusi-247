import { useState } from "react";

export const useTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (idx: number) => {
    setTabIndex(idx);
  };

  return {
    handleTabsChange,
    setTabIndex,
    tabIndex,
  };
};
