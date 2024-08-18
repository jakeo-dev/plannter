import { Dispatch, SetStateAction } from "react";

export default function Dropdown(props: {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  options: { [key: string]: string };
}) {
  return (
    <>
      <label className="modalSubtext">{props.label}</label>
      <select
        onChange={(e) => props.setValue(e.currentTarget.value)}
        value={props.value}
        className="input darkArrowsSelect dark:lightArrowsSelect mb-0"
      >
        <optgroup label={"Select " + props.label}>
          {Object.entries(props.options).map(([key, value]) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
        </optgroup>
      </select>
    </>
  );
}
