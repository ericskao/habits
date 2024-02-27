"use client";

import Header from "@/components/shared/Header";
import Heading from "@/components/ui/heading";
import { format } from "date-fns";
import { useState } from "react";

// name, description, numAttendees, availableTimes (ConfirmedTimeType[])

const mockData = {
  name: "Soju Night",
  description: "Chamisul Fresh only",
  location: "Pocha K",
  numAttendees: null,
  availableTimes: [
    {
      date: new Date("2024-02-27T08:00:00.000Z"),
      startTime: new Date("2024-02-27T16:30:00.000Z"),
      endTime: new Date("2024-02-27T18:00:00.000Z"),
      id: 1,
    },
    {
      date: new Date("2024-02-27T08:00:00.000Z"),
      startTime: new Date("2024-02-27T17:30:00.000Z"),
      endTime: null,
      id: 2,
    },
    {
      date: new Date("2024-03-01T08:00:00.000Z"),
      startTime: new Date("2024-03-01T08:00:00.000Z"),
      endTime: null,
      id: 3,
    },
  ],
};

const savedAvailability: { [timeId: number]: boolean | "indeterminate" } = {};

export default function Invite({ params }: { params: { id: string } }) {
  const [inviteTimeResponses, setInviteTimeResponses] = useState<{
    [key: number]: boolean | "indeterminate";
  }>({});

  return (
    <div className="w-full">
      <Header />
      <section>
        <div className="pt-6 px-4">
          <Heading as="h1">{mockData.name}</Heading>
          {mockData.description && <div>{mockData.description}</div>}
        </div>
        <div className="py-6 px-4">
          <div>
            Which date and times are you able to attend
            <br /> <span className="font-semibold">{mockData.name}</span>
            {mockData.location && <span> at {mockData.location}</span>}?
          </div>
          <ul className="p-3 flex flex-col gap-y-3">
            {mockData.availableTimes.map((time, index) => {
              // we should check local state for user recorded updates before defaulting to checking data from query for that particular timeId
              const checkedState = inviteTimeResponses.hasOwnProperty(time.id)
                ? inviteTimeResponses[time.id]
                : savedAvailability[time.id];
              return (
                <li key={index} className="flex gap-x-2">
                  <div className="flex flex-col">
                    <span>{format(time.date, "PPPP")}</span>
                    <span>
                      {format(time.startTime, "p")}{" "}
                      {time.endTime && ` to ${format(time.endTime, "p")}`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
