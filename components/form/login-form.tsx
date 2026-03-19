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
import { signInSchema, signUpSchema } from "@/utils/userSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type FormData = z.infer<typeof signInSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (formData: FormData) => {
    const email = formData.email;
    const password = formData.password;
    signIn("credentials", { email, password, redirectTo: "/" });
  };
  return (
    <div
      className={cn("flex flex-col gap-6 items-center", className)}
      {...props}
    >
      <Card className="px-4 py-6 md:px-12 w-85.75 md:w-135 h-154.75 dark:bg-neutral-950">
        <AuthCardHeader
          title="Welcome to Note"
          description="Please log in to continue"
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="dark:text-white">
                  Email Address
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="email@example.com"
                  aria-required
                  className="dark:border-neutral-600 dark:placeholder:text-neutral-500 dark:text-white"
                />
                {errors?.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
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
                    {...register("password")}
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
                {errors?.password && (
                  <p className="text-accent-500">{errors.password.message}</p>
                )}
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
                  onClick={() =>
                    signIn("google", { redirectTo: "/application" })
                  }
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
