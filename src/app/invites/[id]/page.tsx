"use client";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { format } from "date-fns";

// name, description, numAttendees, availableTimes (ConfirmedTimeType[])

const mockData = {
  name: "Soju Night",
  description: "Chamisul Fresh only",
  location: "Pocha K",
  numAttendees: null,
  availableTimes: [
    {
      date: "2024-02-27T08:00:00.000Z",
      startTime: "2024-02-27T16:30:00.000Z",
      endTime: "2024-02-27T18:00:00.000Z",
    },
    {
      date: "2024-02-27T08:00:00.000Z",
      startTime: "2024-02-27T17:30:00.000Z",
      endTime: null,
    },
    {
      date: "2024-03-01T08:00:00.000Z",
      startTime: "2024-03-01T08:00:00.000Z",
      endTime: null,
    },
  ],
};

export default function Invite({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* {params.id} */}
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
            {mockData.location && (
              <span className="text-gray-600"> at {mockData.location}</span>
            )}
            ?
          </div>
          <ul className="p-3 flex flex-col gap-y-3">
            {mockData.availableTimes.map((time, index) => (
              <li key={index} className="flex">
                <button>radio button here</button>
                <div className="flex flex-col">
                  <span>{format(time.date, "PPPP")}</span>
                  <span>
                    {format(time.startTime, "p")}{" "}
                    {time.endTime && ` to ${format(time.endTime, "p")}`}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="secondary">Add more times</Button>
        </div>
      </section>
    </div>
  );
}
