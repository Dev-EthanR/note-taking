import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Item } from "@/utils/types/item";
import Image from "next/image";

interface Props {
  item: Item;
}

const RadioInput = ({ item }: Props) => {
  return (
    <FieldLabel htmlFor={item.id}>
      <Field orientation="horizontal">
        <FieldContent>
          <span className="bg-white dark:bg-neutral-950 min-w-10 h-10 rounded-xl flex justify-center items-center border border-neutral-200 dark:border-neutral-700">
            <Image
              src={item.imageSrc}
              alt=""
              width={24}
              height={24}
              className="dark:invert select-none"
            />
          </span>
          <div>
            <FieldTitle className="text-neutral-950 dark:text-white">
              {item.title}
            </FieldTitle>
            <FieldDescription className="text-neutral-700 text-xs lg:text-sm dark:text-neutral-400">
              {item.description}
            </FieldDescription>
          </div>
        </FieldContent>
        <RadioGroupItem
          value={item.value}
          id={item.id}
          className="self-center"
        />
      </Field>
    </FieldLabel>
  );
};

export default RadioInput;
