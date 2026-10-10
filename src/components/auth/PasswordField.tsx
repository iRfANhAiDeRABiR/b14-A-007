"use client";

import { useState } from "react";
import { Input, Label } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export default function PasswordField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  autoComplete = "current-password",
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const errorId = `${id}-error`;
  const toggleLabel = isVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন";

  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={id}
        isInvalid={Boolean(error)}
        isDisabled={disabled}
        className="text-sm font-medium text-[#1d271f]"
      >
        {label}
      </Label>

      <div className="relative">
        <Input
          id={id}
          name={name}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          fullWidth
          className={`h-10 w-full rounded-lg border bg-[#fafcfa] pl-3.5 pr-10 text-sm text-[#1d271f] placeholder:text-[#1d271f]/45 transition-colors focus:outline-none focus:ring-2 ${
            error
              ? "border-[#d03739] focus:border-[#d03739] focus:ring-[#d03739]/20"
              : "border-[#e1e8e1] focus:border-[#05893e] focus:ring-[#05893e]/20"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        />

        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          disabled={disabled}
          aria-label={toggleLabel}
          title={toggleLabel}
          aria-pressed={isVisible}
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-[#1d271f]/60 hover:text-[#1d271f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isVisible ? (
            <EyeSlash className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-[#d03739]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

