import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

import type {
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { EyeIcon, EyeClosed } from "lucide-react";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;

  nivel?: "iniciante" | "intermediário" | "avançado";
};

type PropsType = {
  placeholder: string;
  type: string;
  label: string;
  errorValidate?: FieldError;
  registerType: keyof FormData;
  register: UseFormRegister<FormData>;
  rules?: RegisterOptions<FormData, keyof FormData>;
  passwodShow: boolean | null;
};

export function InputField({
  errorValidate,
  label,
  placeholder,
  type,
  registerType,
  register,
  rules,
  passwodShow,
}: PropsType) {
  const [showEye, setShowEye] = useState(false);
  const inputType =
    type === "password" ? (showEye ? "text" : "password") : type;

  return (
    <Field className="my-2">
      <FieldLabel
        className="text-lg text-black "
        htmlFor={`input-field-${String(registerType)}`}
      >
        {label}
      </FieldLabel>
      <div className="flex items-centerm  justify-between border-text-secondary/40 rounded-sm border p-3 shadow-lg w-full ">
        <input
          className="outline-none"
          {...register(registerType, rules)}
          id={`input-field-${String(registerType)}`}
          type={inputType}
          placeholder={placeholder}
        />

        {passwodShow &&
          (showEye ? (
            <EyeIcon
              onClick={() => setShowEye((prev) => !prev)}
              className="text-text-secondary"
            />
          ) : (
            <EyeClosed
              onClick={() => setShowEye((prev) => !prev)}
              className="text-text-secondary"
            />
          ))}
      </div>

      {errorValidate && (
        <FieldDescription className="text-red-500">
          {errorValidate.message}
        </FieldDescription>
      )}
    </Field>
  );
}
