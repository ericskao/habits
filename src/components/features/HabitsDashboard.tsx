"use client";
import { useHabits } from "@/hooks/useHabits";
import { cn } from "@/lib/utils";
import { Button, Modal, NumberInput, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import HabitsList from "./HabitsList";

const customRepeatOptions = [
  { val: 1, label: "M" },
  { val: 2, label: "T" },
  { val: 3, label: "W" },
  { val: 4, label: "Th" },
  { val: 5, label: "F" },
  { val: 6, label: "Sa" },
  { val: 0, label: "Su" },
];

const normalizeFrequency = (frequency: string) => {
  if (frequency === "Per Day") return "daily";
  if (frequency === "Per Week") return "weekly";
  if (frequency === "Per Month") return "monthly";
};

const HabitsDashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState<string>("");
  const [goalQuantity, setGoalQuantity] = useState<string | number>("1");
  const [quantityType, setQuantityType] = useState<string>("Times");
  const [frequency, setFrequency] = useState<string>("Per Day");
  const [repeatSelectOption, setRepeatSelectOption] = useState<string>("Daily");
  const [repeatFrequency, setRepeatFrequency] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6,
  ]);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const { addHabit } = useHabits();

  const clearState = () => {
    setName("");
    setGoalQuantity("1");
    setQuantityType("Times");
    setFrequency("Per Day");
    setRepeatSelectOption("Daily");
    setRepeatFrequency([0, 1, 2, 3, 4, 5, 6]);
    setStartDate(new Date());
  };

  const onSaveHabit = () => {
    addHabit({
      name,
      goalQuantity,
      quantityType: quantityType.toLowerCase(),
      frequency: normalizeFrequency(frequency) as string,
      repeatFrequency,
      startDate,
    });
    close();
    clearState();
  };

  return (
    <main>
      <Modal opened={opened} onClose={close}>
        <form onSubmit={onSaveHabit} className="flex flex-col gap-y-2">
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => e && setName(e.currentTarget.value)}
          />
          <div className="flex gap-x-2 align-bottom">
            <NumberInput
              className="w-32"
              label="Goal"
              value={goalQuantity}
              onChange={(val) => setGoalQuantity(val)}
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
          {frequency === "Per Day" && (
            <div className="flex gap-x-4 items-end">
              <Select
                label="Repeat"
                data={["Daily", "Custom"]}
                value={repeatSelectOption}
                onChange={(val) => {
                  if (!val) return;
                  if (val == "Daily") {
                    setRepeatFrequency([0, 1, 2, 3, 4, 5, 6]);
                  }
                  setRepeatSelectOption(val);
                }}
              />
              {repeatSelectOption === "Custom" && (
                <div className="flex gap-x-2 pb-1">
                  {customRepeatOptions.map((option) => (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (repeatFrequency.includes(option.val)) {
                          setRepeatFrequency(
                            repeatFrequency.filter((val) => val !== option.val),
                          );
                        } else {
                          setRepeatFrequency(
                            [...repeatFrequency, option.val].sort(),
                          );
                        }
                      }}
                      className={cn(
                        "w-7 h-7 rounded-full text-sm font-medium",
                        repeatFrequency.includes(option.val)
                          ? "bg-primary text-white"
                          : "border border-secondary",
                      )}
                      key={option.val}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <Select
            className="w-32"
            label="Start Date"
            data={["Today", "Tomorrow"]}
            value={"Today"}
          />
          <div className="mt-6 flex justify-end gap-x-2">
            <Button onClick={close} variant="default">
              Cancel
            </Button>
            <Button
              onClick={onSaveHabit}
              className={cn("bg-[#228be6]", {
                "opacity-70 text-gray-100": !name,
              })}
              variant="filled"
              disabled={!name}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
      <Button variant="default" onClick={open}>
        Add Habits
      </Button>
      <HabitsList />
    </main>
  );
};

export default HabitsDashboard;
