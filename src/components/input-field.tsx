import { memo, useState } from "react";

import { InputFieldSizes } from "@/lib/constants";
import LockedIcon from "@/ui/icons/icon-locked";
import UnlockedIcon from "@/ui/icons/icon-unlocked";
import { debounce } from "lodash";

interface InputFieldProps {
  type: string;
  id: string;
  label: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  validationFunction?: (value: string) => boolean;
  inputSize?: InputFieldSizes;
  props?: InputFieldProps;
}

function InputField({
  type,
  id,
  label,
  placeholder,
  onValueChange,
  onKeyDown,
  validationFunction,
  inputSize = InputFieldSizes.SMALL,
  props,
}: InputFieldProps) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const sizeClass = {
    [InputFieldSizes.SMALL]: "w-1/4",
    [InputFieldSizes.MEDIUM]: "w-1/2",
    [InputFieldSizes.LARGE]: "w-3/4",
    [InputFieldSizes.FULL]: "w-full",
  }[inputSize];

  const debounceChange = debounce((newValue: string) => {
    onValueChange(newValue);
  }, 300);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceChange(newValue);

    if (validationFunction) {
      setIsValid(validationFunction(newValue));
    }
  };

  return (
    <label
      htmlFor={id}
      className={`flex flex-col gap-1 text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
        isValid
          ? "text-emerald-500 focus-within:text-emerald-300"
          : "text-eminence-300 focus-within:text-eminence-100"
      }`}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {isValid && <UnlockedIcon className="h-4 w-4" />}
        {!isValid && validationFunction && <LockedIcon className="h-4 w-4" />}
      </div>
      <input
        type={type}
        pattern="\d*"
        name={id}
        id={id}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        className={`form-input block rounded-lg border-0 bg-eminence-950/75 backdrop-blur-sm p-2.5 text-eminence-50 ring-2 transition-shadow duration-300 placeholder:font-medium placeholder:opacity-60 focus:ring-2 focus:placeholder:opacity-30 focus:placeholder:transition-opacity ${
          isValid
            ? "ring-emerald-800 focus:ring-emerald-500"
            : "ring-eminence-700 focus:ring-eminence-300"
        } ${sizeClass}`}
        min="1"
        placeholder={placeholder}
        {...props}
      />
    </label>
  );
}

export default memo(InputField);
