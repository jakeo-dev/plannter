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
            isFocused ? "text-gray-600" : "text-gray-200",
            "p-1",
            isFocused ? "hover:text-red-800" : "hover:text-red-400"
          ),
        control: ({ isDisabled, isFocused }) =>
          classNames(
            isDisabled ? "bg-gray-50" : "bg-gray-100",
            isDisabled
              ? "border-gray-100"
              : isFocused
              ? "border-blue-600 border-2"
              : "border-gray-300",
            "rounded-md",
            "border-2",
            "px-3 py-2",
            isFocused && "border-2 border-blue-600",
            isFocused
              ? "hover:border-blue-600 border-2 bg-gray-200"
              : "hover:bg-gray-200"
          ),
        dropdownIndicator: ({ isFocused }) =>
          classNames(
            isFocused ? "text-gray-800" : "text-gray-800 dark:text-gray-200",
            "",
            isFocused ? "hover:text-gray-800" : "hover:text-gray-500"
          ),
        group: () => classNames("py-2"),
        groupHeading: () =>
          classNames(
            "text-gray-400",
            "text-xs",
            "font-medium",
            "mb-1",
            "px-3",
            "uppercase"
          ),
        indicatorSeparator: ({ isDisabled }) =>
          classNames(isDisabled ? "bg-gray-300" : "bg-gray-300", "mx-2 my-0.5"),
        input: () => classNames("text-gray-800 ml-0.5"),
        menu: () =>
          classNames("bg-white", "rounded-md", "text-sm", "shadow-md", "my-1"),
        menuList: () => classNames("py-1"),
        multiValue: () =>
          classNames(
            "bg-gray-200",
            "border-2 border-gray-100",
            "rounded-md",
            "flex",
            "items-center",
            "pl-2",
            "pr-1",
            "py-0.5",
            "m-[0.0625rem]"
          ),
        multiValueLabel: () =>
          classNames("rounded-md", "text-gray-800", "text-sm"),
        multiValueRemove: ({ isFocused }) =>
          classNames(
            "rounded-full ml-1",
            isFocused && "bg-red-400",
            "p-0.5",
            "hover:bg-gray-300",
            "hover:text-red-600"
          ),
        noOptionsMessage: () =>
          classNames("text-sm", "text-gray-500", "py-2"),
        option: ({ isDisabled, isFocused, isSelected }) =>
          classNames(
            isSelected
              ? "bg-gray-300"
              : isFocused
              ? "bg-gray-200"
              : "bg-transparent",
            isDisabled
              ? "text-gray-200"
              : isSelected
              ? "text-white"
              : "text-inherit",
            "py-2",
            "px-3",
            !isDisabled &&
              (isSelected ? "active:bg-gray-200" : "active:bg-gray-300")
          ),
        placeholder: () => classNames("text-gray-500", ""),
        valueContainer: () => classNames(),
      }}
    />
  );
}
