"use client";

import { cn } from "@/lib/utils";
import * as RadixLabel from "@radix-ui/react-label";
import { ChangeEventHandler } from "react";

const Input = ({
  id,
  defaultValue,
  labelText,
  inputPlaceholder,
  children,
  autoFocus,
  inputType = "text",
  inputRequired,
  value,
  onInputChange,
}: {
  autoFocus?: boolean;
  labelText?: string;
  id?: string;
  defaultValue?: string;
  inputPlaceholder?: string;
  children?: React.ReactNode;
  inputType?: "text" | "textarea" | "number";
  inputRequired?: boolean;
  value?: string | number;
  onInputChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) => {
  return (
    <div className="shadow-inner-secondary flex flex-col-reverse rounded-lg px-3 py-2 focus-within:shadow-inner-focused">
      {(inputType === "text" || inputType === "number") && (
        <input
          className="outline-none peer"
          id={id}
          autoFocus={autoFocus}
          type={inputType}
          defaultValue={defaultValue}
          placeholder={inputPlaceholder}
          required={inputRequired}
          onChange={onInputChange}
          value={value}
        />
      )}
      {inputType === "textarea" && (
        <textarea
          onChange={onInputChange}
          className="outline-none peer"
          id={id}
        />
      )}
      <RadixLabel.Root
        className={cn(
          "text-secondary-text leading-4 translate-y-3 peer-focus:scale-75 peer-focus:translate-y-0.5  origin-top-left transition-all",
          { "scale-75 translate-y-0.5": value !== "" },
        )}
        htmlFor={id}
      >
        {labelText}
      </RadixLabel.Root>
    </div>
  );
};

export { Input };
