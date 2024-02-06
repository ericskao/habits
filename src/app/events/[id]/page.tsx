"use client";

import ConfirmedDatesList from "@/components/features/ConfirmedDatesList";
import { useEvent } from "@/hooks/useEvent";

export default function Event({ params }: { params: { id: string } }) {
  // const { data, isLoading } = useEvent(params.id);
  // const eventAttributes = data?.data.event.data.attributes;
  const data = useEvent(params.id);
  console.log("data", data);

  const onInviteClick = () => {
    console.log("navigator", navigator);
    if (navigator.share) {
      console.log("sharing");
      navigator
        .share({
          title: "Title of the shared item",
          text: "Description of the shared item",
          url: "https://example.com",
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    }
  };

  return data ? (
    <div>
      {data.name}
      {data.description}
      {data.numAttendees}
      {data.availableTimes && (
        <ConfirmedDatesList confirmedTimes={data.availableTimes} />
      )}
      <button onClick={onInviteClick}>Invite</button>
      {/* {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <Heading as="h1">{eventAttributes?.title}</Heading>
          <Heading as="h3">{eventAttributes?.description}</Heading>
        </div>
      )} */}
    </div>
  ) : (
    <div>{params.id}</div>
  );
}
