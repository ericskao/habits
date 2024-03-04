import { useMutation, useQuery, useQueryClient } from "react-query";
import apiClient from "../http-common";

const habitsApiUrl = "/api/habits";

type HabitType = {
  name: string;
  goalQuantity: string | number;
  quantityType: string;
  frequency: string;
  repeatFrequency: number[];
  startDate: Date;
};

export function useHabits() {
  const { data: habits } = useQuery("habits", async () => {
    const { data } = await apiClient.get(habitsApiUrl);
    return data;
  });
  const queryClient = useQueryClient();

  const checkInMutation = useMutation(
    async (habitId: number) => {
      const { data } = await apiClient.put(
        `${habitsApiUrl}/${habitId}/checkIn`,
      );
    },
    {
      onSuccess: (response) => {
        console.log("success", response);
      },
    },
  );

  const addHabitMutation = useMutation(
    async (newHabit: HabitType) => {
      const {} = await apiClient.post(habitsApiUrl, newHabit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("habits");
      },
    },
  );

  const addHabit = async (newHabit: HabitType) => {
    await addHabitMutation.mutateAsync(newHabit);
  };

  const checkIn = async (habitId: number) => {
    await checkInMutation.mutateAsync(habitId);
  };

  return { habits, addHabit, checkIn };
}
