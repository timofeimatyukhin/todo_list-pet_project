export type TaskStatus = 'IN_PROGRESS' | 'DONE';

export interface TaskDto {
  id: number;
  title: string;
  text: string;
  status: TaskStatus;
}

export interface CreateTaskDto {
  id: null;
  title: string;
  text: string;
  status: null;
}

export interface UpdateTaskDto {
  title: string;
  text: string;
}

export interface UpdateStatusDto {
  status: TaskStatus;
}