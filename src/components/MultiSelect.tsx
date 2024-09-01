import { Option } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { MultiValue } from "react-select";
import Select from "react-select";
import classNames from "classnames";

export default function MultiSelect({
  options,
  value,
  onChange,
  searchInput,
  onSearchInput,
  isMenuOpen,
  onMenuOpen,
  onMenuClose,
  placeholder,
  isClearable,
  isSearchable,
}: {
  options: Option[];
  value: MultiValue<{
    value: string;
    label: string;
  }>;
  onChange: (arg: any) => void;
  searchInput: string;
  onSearchInput: Dispatch<SetStateAction<string>>;
  isMenuOpen: boolean;
  onMenuOpen: () => void;
  onMenuClose: () => void;
  placeholder: string;
  isClearable: boolean;
  isSearchable: boolean;
}) {
  return (
    <Select
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      inputValue={searchInput}
      onInputChange={onSearchInput}
      menuIsOpen={isMenuOpen}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
      placeholder={placeholder}
      isClearable={isClearable}
      isSearchable={isSearchable}
      unstyled
      classNamePrefix="select"
      classNames={{
        clearIndicator: ({ isFocused }) =>
          classNames(
            "p-1",
            isFocused
              ? "text-gray-600 dark:text-gray-400"
              : "text-gray-200 dark:text-gray-800",
            isFocused ? "hover:text-red-800" : "hover:text-red-400"
          ),
        control: ({ isDisabled, isFocused }) =>
          classNames(
            "rounded-md border-2 px-3 py-2",
            isDisabled
              ? "bg-gray-50 dark:bg-gray-950 border-gray-100 dark:border-gray-900"
              : isFocused
              ? "bg-gray-100 dark:bg-gray-900 border-blue-600 border-2"
              : "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700",
            isFocused && "border-2 border-blue-600",
            isFocused
              ? "hover:border-blue-600 border-2 bg-gray-100 dark:bg-gray-700"
              : "hover:bg-gray-200 dark:hover:bg-gray-800"
          ),
        dropdownIndicator: ({ isFocused }) =>
          classNames(
            "text-gray-800 dark:text-gray-200",
            isFocused
              ? "hover:text-gray-800 dark:hover:text-gray-200"
              : "hover:text-gray-500 dark:hover:text-gray-500"
          ),
        group: () => classNames("py-2"),
        groupHeading: () =>
          classNames(
            "text-gray-400 dark:text-gray-600 text-xs font-medium px-3 mb-1 uppercase"
          ),
        indicatorSeparator: () =>
          classNames("hidden bg-gray-300 dark:bg-gray-700 mx-2 my-0.5"),
        input: () => classNames("text-gray-800 dark:text-gray-200 ml-0.5"),
        menu: () =>
          classNames(
            "bg-white dark:bg-gray-800 rounded-md text-sm shadow-md my-1"
          ),
        menuList: () => classNames("py-1"),
        multiValue: () =>
          classNames(
            "flex items-center bg-gray-200 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-900 rounded-md pl-2 pr-1 py-0.5 m-[0.0625rem]"
          ),
        multiValueLabel: () =>
          classNames("rounded-md text-gray-800 dark:text-gray-200 text-sm"),
        multiValueRemove: () =>
          classNames(
            "hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 rounded-full transition p-0.5 ml-1"
          ),
        noOptionsMessage: () => classNames("text-sm text-gray-500 py-2"),
        option: ({ isDisabled, isFocused, isSelected }) =>
          classNames(
            "transition px-3 py-2",
            isSelected
              ? "bg-gray-300 dark:bg-gray-600"
              : isFocused
              ? "bg-gray-200 dark:bg-gray-700"
              : "bg-transparent",
            isDisabled
              ? "text-gray-200 dark:text-gray-800"
              : isSelected
              ? "text-white"
              : "text-inherit",
            !isDisabled &&
              (isSelected
                ? "active:bg-gray-200 dark:active:bg-gray-700"
                : "active:bg-gray-300 dark:active:bg-gray-600")
          ),
        placeholder: () => classNames("text-gray-500"),
        valueContainer: () => classNames(),
      }}
    />
  );
}
