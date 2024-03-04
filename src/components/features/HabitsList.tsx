import { useHabits } from "@/hooks/useHabits";

const HabitsList = () => {
  const { habits, checkIn } = useHabits();
  return (
    <div>
      {habits &&
        habits.map((habit: { id: number; name: string }) => (
          <div className="px-3 py-2 border flex justify-between" key={habit.id}>
            <div>{habit.name}</div>
            <div>
              <button onClick={() => checkIn(habit.id)}>Check In</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HabitsList;
