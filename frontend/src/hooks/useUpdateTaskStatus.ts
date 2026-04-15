import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks';
import type { UpdateStatusDto } from '../types/task';

type UpdateStatusVariables = {
  id: number;
  payload: UpdateStatusDto;
};

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateStatusVariables) => tasksApi.updateStatus(id, payload),
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.setQueryData(['task', task.id], task);
    },
  });
}
