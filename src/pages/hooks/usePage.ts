/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  generateRandomNumber,
  getTheLowestPositiveValueOfGeneratedArrayNumber,
  getTheMissingLowestValueOfLowestPositiveValue,
} from "../../utils";
import { useTabs } from "./useTabs";

export const usePage = () => {
  const [value, setValue] = useState(0);
  const { handleTabsChange, tabIndex } = useTabs();
  const [generateRowAndColumns, setGenerateRowAndColumns] = useState<
    number[][] | number[]
  >([]);
  const [lowestValueMissingNumbers, setLowestValueMissingNumbers] =
    useState<number>(null!);
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

  const handleReset = () => {
    setGenerateRowAndColumns([]);
    setValue(1);
    handleTabsChange(0);
    setLowestValueMissingNumbers(null!);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return {
    ref,
    lowestValueMissingNumbers,
    lowestValueOfPositiveNumber,
    handleReset,
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
