"use client";
import {
  changePasswordData,
  changePasswordSchema,
} from "@/utils/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import PasswordInput from "./PasswordInput";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<changePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onsubmit = async (formData: changePasswordData) => {
    const { oldPassword, newPassword } = formData;
    await axios.patch("/api/settings/user", { oldPassword, newPassword });
    const router = useRouter();
    router.refresh();
  };

  return (
    <div>
      <h2 className="text-neutral-950 font-semibold dark:text-white mb-6">
        Change Password
      </h2>
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-y-6">
        <PasswordInput
          label="Old Password"
          name="oldPassword"
          register={register}
          errors={errors}
        />
        <div className="space-y-2">
          <PasswordInput
            label="New Password"
            name="newPassword"
            register={register}
            errors={errors}
          />
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
        </div>
        <PasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          register={register}
          errors={errors}
        />
        <Button
          variant="primary"
          size="xl"
          className="self-end"
          disabled={isSubmitting}
          type="submit"
        >
          Save Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
