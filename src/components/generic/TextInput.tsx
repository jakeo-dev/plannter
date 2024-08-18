import { Dispatch, SetStateAction } from "react";

export default function TextInput(props: {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <>
      <label className="modalSubtext">
        {props.label}
        {props.required ? <span className="text-red-500">*</span> : <></>}
      </label>
      <input
        type="text"
        className="input md:mb-0"
        value={props.value}
        onInput={(e) => props.setValue(e.currentTarget.value)}
        autoComplete="off"
        maxLength={props.maxLength || 80}
        required={props.required}
      />
    </>
  );
}
