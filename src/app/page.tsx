import HabitsDashboard from "@/components/features/HabitsDashboard";
import Header from "@/components/shared/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-y-3">
      <Header />
      <main className="w-full">
        <HabitsDashboard />
      </main>
    </div>
  );
}
