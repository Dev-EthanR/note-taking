"use client";
import clsx from "clsx";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { title } from "process";

interface Props {
  name: string;
  imageUrl: string;
  handleClick: () => void;
  actionType: "delete" | "restore" | "archive";
}

const NoteAction = ({ name, imageUrl, handleClick, actionType }: Props) => {
  const searchParams = useSearchParams();
  const noteStatusParam = searchParams.get("note");

  if (actionType === "restore") {
    return (
      <Button
        variant="outline"
        className={clsx(
          "w-9 h-9 lg:px-4 lg:py-3 lg:min-w-36.25 lg:w-full 2xl:w-60.5 lg:h-11 text-sm text-neutral-950 dark:text-white flex justify-center items-center border-0 lg:border lg:justify-start",
          noteStatusParam === "create" && "invisible",
        )}
        onClick={handleClick}
      >
        <Image
          src={imageUrl}
          alt=""
          width={20}
          height={20}
          className="dark:invert"
        />
        <span className="hidden lg:block">{name}</span>
      </Button>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className={clsx(
            "w-9 h-9 lg:px-4 lg:py-3 lg:min-w-36.25 lg:w-full 2xl:w-60.5 lg:h-11 text-sm text-neutral-950 dark:text-white flex justify-center items-center border-0 lg:border lg:justify-start",
            noteStatusParam === "create" && "invisible",
          )}
        >
          <Image
            src={imageUrl}
            alt=""
            width={20}
            height={20}
            className="dark:invert"
          />
          <span className="hidden lg:block">{name}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-neutral-800 dark:border-neutral-500 dark:border ">
        <AlertDialogHeader className="flex gap-3 font-[system-ui] ">
          <span className="bg-neutral-100 dark:bg-neutral-500 min-w-10 h-10 rounded-sm flex justify-center items-center">
            <Image
              src={imageUrl}
              alt=""
              width={24}
              height={24}
              className="w-6 dark:invert"
            />
          </span>
          <div>
            <AlertDialogTitle className="text-neutral-950 dark:text-white">
              {name}
            </AlertDialogTitle>

            {actionType === "delete" && (
              <AlertDialogDescription>
                Are you sure you want to permanently delete this note? This
                action cannot be undone.
              </AlertDialogDescription>
            )}
            {actionType === "archive" && (
              <AlertDialogDescription>
                Are you sure you want to archive this note? You can find it in
                the Archived Notes section and restore it anytime.
              </AlertDialogDescription>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="font-[system-ui] bg-white dark:bg-neutral-800 dark:border-t-neutral-500">
          <AlertDialogCancel
            variant="link_button"
            size="lg"
            className="bg-neutral-100 dark:bg-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-400"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
            variant={actionType === "delete" ? "destructive" : "primary"}
            size="lg"
          >
            {name}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoteAction;
