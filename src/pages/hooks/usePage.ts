import { useEffect, useMemo, useRef, useState } from "react";
import {
  generateRandomNumber,
  getTheLowestPositiveValueOfGeneratedArrayNumber,
  getTheMissingLowestValueOfLowestPositiveValue,
} from "../../utils";
import { useTabs } from "./useTabs";

export const usePage = () => {
  const [value, setValue] = useState(1);
  const { handleTabsChange, tabIndex } = useTabs();
  const [generateRowAndColumns, setGenerateRowAndColumns] = useState<
    number[][] | number[]
  >([]);
  const [lowestValueMissingNumbers, setLowestValueMissingNumbers] =
    useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ref = useRef<HTMLInputElement>(null!);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.valueAsNumber);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleTabsChange(1);
  };

  const handleGenerate = () => {
    const generate = generateRandomNumber(value);
    setGenerateRowAndColumns(generate);
  };

  const handlePositiveNumber = () => {
    const findLowestValue = getTheLowestPositiveValueOfGeneratedArrayNumber(
      generateRowAndColumns.flat()
    );

    const missingLowestValue =
      getTheMissingLowestValueOfLowestPositiveValue(findLowestValue);

    setLowestValueMissingNumbers(missingLowestValue);
  };

  const lowestValueOfPositiveNumber = useMemo(
    () =>
      getTheLowestPositiveValueOfGeneratedArrayNumber(
        generateRowAndColumns.flat()
      ),
    [generateRowAndColumns]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return {
    ref,
    lowestValueMissingNumbers,
    lowestValueOfPositiveNumber,
    handlePositiveNumber,
    generateRowAndColumns,
    tabIndex,
    handleGenerate,
    handleChange,
    handleTabsChange,
    value,
    handleSubmit,
  };
};
