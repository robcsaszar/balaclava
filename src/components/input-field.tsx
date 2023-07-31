import LockedIcon from "@/ui/icons/icon-locked";
import UnlockedIcon from "@/ui/icons/icon-unlocked";
import { useState } from "react";

interface InputFieldProps {
  type: string;
  id: string;
  label: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  validationFunction?: (value: string) => boolean;
}

export default function InputField({
  type,
  id,
  label,
  placeholder,
  onValueChange,
  validationFunction,
}: InputFieldProps) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onValueChange(newValue);

    if (validationFunction) {
      setIsValid(validationFunction(newValue));
    }
  };

  return (
    <div className="self-start">
      <label
        htmlFor={id}
        className={`flex flex-col gap-1 text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
          isValid
            ? "text-emerald-500 focus-within:text-emerald-300"
            : "text-eminence-200 focus-within:text-eminence-300"
        }`}
      >
        <div className="flex items-center gap-1">
          <span>{label}</span>
          {isValid && <UnlockedIcon className="h-4 w-4" />}
          {!isValid && validationFunction && <LockedIcon className="h-4 w-4" />}
        </div>
        <input
          required
          type={type}
          pattern="\d*"
          name={id}
          id={id}
          value={value}
          onChange={handleChange}
          className={`block w-48 rounded-lg border-0 bg-eminence-950 p-2.5 text-sm text-eminence-50 ring-2 transition-shadow duration-300 focus:ring-2  focus:placeholder:opacity-25 focus:placeholder:transition-opacity ${
            isValid
              ? "ring-emerald-800 focus:ring-emerald-500"
              : "ring-eminence-700 focus:ring-eminence-500"
          }`}
          min="1"
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}
