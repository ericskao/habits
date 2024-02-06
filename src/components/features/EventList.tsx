"use client";

import { useState } from "react";
import { Tabs } from "../ui/tabs";
import EventCard from "./EventCard";

const EventTypeEnum = {
  HERDING: "herding",
  HOSTING: "hosting",
  ATTENDING: "attending",
} as const;

type EventTypeEnum = (typeof EventTypeEnum)[keyof typeof EventTypeEnum];

const EventList = () => {
  const [eventType, setEventType] = useState<string>(EventTypeEnum.HERDING);
  return (
    <section>
      <Tabs
        options={[
          { value: EventTypeEnum.HERDING },
          { value: EventTypeEnum.HOSTING },
          { value: EventTypeEnum.ATTENDING },
        ]}
        classNames={{ root: "w-full", list: "justify-center" }}
        onValueChange={(eventType) => setEventType(eventType)}
      />
      <ul className="flex flex-col pt-3 gap-5">
        <li>
          <EventCard />
        </li>
        <li>
          <EventCard />
        </li>
        <li>
          <EventCard />
        </li>
      </ul>
    </section>
  );
};

export default EventList;
