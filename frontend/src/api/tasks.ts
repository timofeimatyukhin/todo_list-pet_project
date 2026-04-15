import { apiFetch } from './client';
import type {
  TaskDto,
  CreateTaskDto,
  UpdateTaskDto,
  UpdateStatusDto,
} from '../types/task';


export const tasksApi = {

  getAll: () => apiFetch<TaskDto[]>('/task'),

  getById: (id: number) => apiFetch<TaskDto>(`/task/${id}`),

  create: (task: CreateTaskDto) => 
    apiFetch<TaskDto>('/task', {
      method: 'POST',
      body: JSON.stringify(task),
    }),

  update: (id: number, task: UpdateTaskDto) =>
    apiFetch<TaskDto>(`/task/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }),

  updateStatus: (id: number, status: UpdateStatusDto) =>
    apiFetch<TaskDto>(`/task/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(status),
    }),

    
  delete: (id: number) =>
    apiFetch<void>(`/task/${id}`, {
      method: 'DELETE',
    }),

}