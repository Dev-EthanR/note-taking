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
import { cn } from "@/lib/utils";
import Link from "next/link";
import AuthCardHeader from "./AuthCardHeader";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const credentialsSignin = (formData: FormData) => {
    signIn("credentials", Object.fromEntries(formData.entries()));
  };
  return (
    <div
      className={cn("flex flex-col gap-6 items-center", className)}
      {...props}
    >
      <Card className="px-4 md:px-12 w-85.75 md:w-135 h-154.75 dark:bg-neutral-950">
        <AuthCardHeader
          title="Welcome to Note"
          description="Please log in to continue"
        />
        <CardContent>
          <form action={credentialsSignin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="dark:text-white">
                  Email Address
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  required
                  className="dark:border-neutral-600 dark:placeholder:text-neutral-500 dark:text-white"
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="dark:text-white">
                    Password
                  </FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block  underline-offset-3 underline text-neutral-600 text-[12px] hover:text-primary-500 dark:text-neutral-400 outline-none"
                  >
                    Forgot
                  </Link>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
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
              </Field>
              <Field>
                <Button
                  type="submit"
                  variant="primary"
                  size="xl"
                  className="mb-1.5"
                >
                  Login
                </Button>
                <p className="text-center text-sm text-neutral-600 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-800 pt-4 mb-1.5">
                  Or login with:
                </p>
                <Button
                  variant="outline"
                  type="button"
                  size="xl"
                  className="font-medium text-base gap-3 mb-1.5"
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
                <FieldDescription className="text-center  border-t border-neutral-200 dark:border-neutral-800 pt-4 dark:text-neutral-300">
                  No account yet?{" "}
                  <Link
                    href="/signup"
                    className="outline-none text-neutral-950 hover:text-primary-500 no-underline dark:text-white"
                  >
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
