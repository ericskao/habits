"use client";
import { useHabits } from "@/hooks/useHabits";
import { cn } from "@/lib/utils";
import { Button, Modal, NumberInput, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const HabitsDashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string | number>("1");
  const [quantityType, setQuantityType] = useState<string>("Times");
  const [frequency, setFrequency] = useState<string>("Per Day");
  const [repeatFrequency, setRepeatFrequency] = useState<string>("Daily");

  const { habits, addHabit } = useHabits();
  console.log("habits", habits);

  const onSaveHabit = () => {
    console.log(name, quantity, quantityType, frequency, repeatFrequency);
    addHabit({ name });
  };

  return (
    <main>
      <Modal opened={opened} onClose={close}>
        <div className="flex flex-col gap-y-2">
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => e && setName(e.currentTarget.value)}
          />
          <div className="flex gap-x-2 align-bottom">
            <NumberInput
              className="w-32"
              label="Goal"
              value={quantity}
              onChange={(val) => setQuantity(val)}
              min={1}
              max={100}
            />
            <Select
              className="mt-auto"
              data={["Times", "Minutes"]}
              value={quantityType}
              onChange={(val) => val && setQuantityType(val)}
            />
            <Select
              className="mt-auto"
              data={["Per Day", "Per Week", "Per Month"]}
              value={frequency}
              onChange={(val) => val && setFrequency(val)}
            />
          </div>
          <div className="flex gap-x-4">
            <Select
              label="Repeat"
              data={["Daily", "Monthly"]}
              value={repeatFrequency}
              onChange={(val) => val && setRepeatFrequency(val)}
            />
            <Select
              className="w-32"
              label="Start Date"
              data={["Today", "Tomorrow"]}
              value={"Today"}
            />
          </div>
          <div className="mt-6 flex justify-end gap-x-2">
            <Button onClick={close} variant="default">
              Cancel
            </Button>
            <Button
              onClick={onSaveHabit}
              className={cn("bg-[#228be6]", { "opacity-70": !name })}
              variant="filled"
              disabled={!name}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
      <Button variant="default" onClick={open}>
        Add Habits
      </Button>
    </main>
  );
};

export default HabitsDashboard;
