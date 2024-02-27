import { useMutation, useQuery } from "react-query";
import apiClient from "../http-common";

export function useHabits() {
  const { data: habits } = useQuery("habits", async () => {
    const { data } = await apiClient.get("");
    return data;
  });

  const addTodoMutation = useMutation(
    async (newHabit: { name: string }) => {
      const { data } = await apiClient.post("", newHabit);
      return data;
    },
    {
      onSuccess: (data) => {
        console.log("success!", data);
        // queryCache.invalidateQueries("todos");
      },
    },
  );

  const addHabit = async (newHabit: { name: string }) => {
    await addTodoMutation.mutateAsync(newHabit);
  };

  return { habits, addHabit };
}
