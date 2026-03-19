"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AuthCardHeader from "./AuthCardHeader";
import { useState } from "react";
import Image from "next/image";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "../ui/input-group";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-6 items-center">
      <Card
        {...props}
        className="px-4 py-12 md:px-12 w-85.75 md:w-135 h-154.75 dark:bg-neutral-950 "
      >
        <AuthCardHeader
          title="Create Your Account"
          description="Sign up to start organizing your notes and boost your productivity."
        />
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="dark:text-white">
                  Email Address
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  className="dark:border-neutral-600 dark:placeholder:text-neutral-500 dark:text-white "
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="dark:text-white">
                    Password
                  </FieldLabel>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
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
                <div className="flex items-center gap-2">
                  <Image
                    className="w-4 h-4 dark:invert-65"
                    src={"/images/icon-info.svg"}
                    alt={""}
                    width={25}
                    height={24}
                  />
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    At least 8 characters
                  </p>
                </div>
              </Field>
              <FieldGroup>
                <Field>
                  <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    className="mb-1.5"
                  >
                    Sign up
                  </Button>{" "}
                  <p className="text-center text-sm text-neutral-600 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-800 pt-4 mb-1.5">
                    Or login with:
                  </p>
                  <Button
                    variant="outline"
                    type="button"
                    size="xl"
                    className="font-medium text-base gap-3 mb-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <Image
                      className="dark:invert"
                      src="/images/icon-google.svg"
                      alt=""
                      width={24}
                      height={25}
                    />
                    Google
                  </Button>
                  <FieldDescription className="text-center border-t border-neutral-200 dark:border-neutral-800 pt-4 dark:text-neutral-300 ">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="outline-none text-neutral-950 hover:text-primary-500 no-underline dark:text-white"
                    >
                      Login
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
