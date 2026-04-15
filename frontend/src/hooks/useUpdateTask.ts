import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks';
import type { UpdateTaskDto } from '../types/task';

type UpdateTaskVariables = {
  id: number;
  payload: UpdateTaskDto;
};

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateTaskVariables) => tasksApi.update(id, payload),
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.setQueryData(['task', task.id], task);
    },
  });
}
