"use client";

import { Modal, NumberInput, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Button } from "../ui/button";

const HabitsDashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string | number>("1");
  const [quantityType, setQuantityType] = useState<string>("Times");
  const [frequency, setFrequency] = useState<string>("Per Day");
  const [repeatFrequency, setRepeatFrequency] = useState<string>("Daily");

  return (
    <main>
      <Modal opened={opened} onClose={close}>
        <div className="uppercase">slkfj</div>
        <TextInput label="Name" />
        <div className="flex gap-x-2">
          <NumberInput
            className="!w-8 text-xl"
            label="Goal"
            value={quantity}
            onChange={(val) => setQuantity(val)}
            min={1}
            max={100}
          />
          <Select
            data={["Times", "Minutes"]}
            value={quantityType}
            onChange={(val) => val && setQuantityType(val)}
          />
          <Select
            data={["Per Day", "Per Week", "Per Month"]}
            value={frequency}
            onChange={(val) => val && setFrequency(val)}
          />
          <Select
            label="Repeat"
            data={["Daily", "Monthly"]}
            value={repeatFrequency}
          />
        </div>
      </Modal>
      <Button variant="default" onClick={open}>
        Add Habits
      </Button>
    </main>
  );
};

export default HabitsDashboard;
