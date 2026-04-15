import { useQuery } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks';

export function useTaskById(id: number | null) {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => tasksApi.getById(id as number),
    enabled: id !== null,
  });
}
