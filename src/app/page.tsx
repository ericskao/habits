import EventList from "@/components/features/EventList";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-y-3">
      <Header />
      <main className="w-full px-4">
        <Heading as="h1">
          Welcome back, <br /> Eric!
        </Heading>
        <div className="pt-2">You have no upcoming events.</div>
        <Link href="/new">
          <Button className="mt-2">Create one now</Button>
        </Link>
        <EventList />
      </main>
    </div>
  );
}
