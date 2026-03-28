import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Item } from "@/utils/types/item";
import RadioInput from "./RadioInput";

interface DefaultValue {
  currentValue?: string;
  fallback: string;
}

interface Props {
  title: string;
  description: string;
  groups: Item[];
  currentValue: DefaultValue;
  onSubmit: (formData: FormData) => Promise<void>;
}

const SettingsCard = ({
  title,
  description,
  groups,
  currentValue,
  onSubmit,
}: Props) => {
  return (
    <div>
      <h2 className="text-neutral-950 font-bold dark:text-white">{title}</h2>
      <p className="text-neutral-950 dark:text-neutral-300 mb-7">
        {description}
      </p>
      <form className="flex flex-col gap-4" action={onSubmit}>
        <RadioGroup
          defaultValue={currentValue.currentValue || currentValue.fallback}
          className="w-full"
          name="theme"
        >
          {groups.map((item) => (
            <RadioInput item={item} key={item.id} />
          ))}
        </RadioGroup>
        <Button variant="primary" size="xl" className="self-end">
          Apply Changes
        </Button>
      </form>
    </div>
  );
};

export default SettingsCard;
