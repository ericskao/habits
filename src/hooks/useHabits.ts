import { useMutation, useQuery } from "react-query";
import apiClient from "../http-common";

const habitsApiUrl = "/api/habits";

export function useHabits() {
  const { data: habits } = useQuery("habits", async () => {
    const { data } = await apiClient.get(habitsApiUrl);
    return data;
  });

  const addHabitMutation = useMutation(
    async (newHabit) => {
      console.log(newHabit);
      const { data } = await apiClient.post(habitsApiUrl, newHabit);
    },
    {
      onSuccess: (data) => {
        console.log("success!", data);
        // queryCache.invalidateQueries("todos");
      },
    },
  );

  const addHabit = async (newHabit) => {
    await addHabitMutation.mutateAsync(newHabit);
  };

  return { habits, addHabit };
}
