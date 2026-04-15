import { useQuery } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks';

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: tasksApi.getAll,
  });
}