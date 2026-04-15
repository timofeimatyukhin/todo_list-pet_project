import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasks";
import type { CreateTaskDto } from "../types/task";



export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskDto) => tasksApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  })
}