"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { changePasswordData } from "@/utils/changePasswordSchema";
import Image from "next/image";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  name: keyof changePasswordData;
  register: UseFormRegister<changePasswordData>;
  errors: FieldErrors<changePasswordData>;
}

const PasswordInput = ({ register, name, label, errors }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Field>
      <div className="flex items-center">
        <FieldLabel htmlFor={name} className="dark:text-white">
          {label}
        </FieldLabel>
        {errors[name] && (
          <span className="text-sm text-red-500 ml-2">
            {errors[name]?.message?.toString()}
          </span>
        )}
      </div>
      <InputGroup>
        <InputGroupInput
          id={name}
          {...register(name)}
          type={showPassword ? "text" : "password"}
          aria-required
        />
        <InputGroupAddon align="inline-end" className="pr-2">
          <InputGroupButton
            className="bg-none cursor-pointer dark:invert-65"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image
              alt="show password"
              src={`/images/icon-${showPassword ? "hide" : "show"}-password.svg`}
              width={20}
              height={20}
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};

export default PasswordInput;
