import { useState, type FormEvent } from 'react';
import TaskFormContainer from './components/TaskFormContainer';
import TaskListContainer from './components/TaskListContainer';
import { useCreateTask } from './hooks/useCreateTask';
import { useDeleteTask } from './hooks/useDeleteTask';
import { useTaskById } from './hooks/useTaskById';
import { useTasks } from './hooks/useTasks';
import { useUpdateTask } from './hooks/useUpdateTask';
import { useUpdateTaskStatus } from './hooks/useUpdateTaskStatus';
import type { TaskStatus } from './types/task';

export default function App() {
  const [lookupInput, setLookupInput] = useState('');
  const [lookupId, setLookupId] = useState<number | null>(null);
  const [lookupError, setLookupError] = useState('');

  const { data, isLoading, isError, error } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const updateTaskStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();
  const taskById = useTaskById(lookupId);

  const isSubmitting =
    createTask.isPending ||
    updateTask.isPending ||
    updateTaskStatus.isPending ||
    deleteTask.isPending;

  if (isLoading) return <div>Loading tasks...</div>;

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>

      <TaskFormContainer
        isSubmitting={createTask.isPending}
        onCreate={({ title, text }) =>
          createTask.mutate({
            id: null,
            title,
            text,
            status: null,
          })
        }
      />

      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const id = Number(lookupInput);
          if (!Number.isInteger(id) || id <= 0) {
            setLookupError('Enter valid id');
            return;
          }
          setLookupError('');
          setLookupId(id);
        }}
      >
        <input
          value={lookupInput}
          onChange={(event) => setLookupInput(event.target.value)}
          placeholder="Task id"
        />
        <button type="submit">Get by id</button>
      </form>

      {lookupError && <p>{lookupError}</p>}
      {taskById.isError && <p>Error: {(taskById.error as Error).message}</p>}
      {taskById.data && (
        <p>
          Found: {taskById.data.title} - {taskById.data.status}
        </p>
      )}

      {!data || data.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <TaskListContainer
          tasks={data}
          isSubmitting={isSubmitting}
          onUpdate={(id, payload) => updateTask.mutate({ id, payload })}
          onToggleStatus={(id, currentStatus: TaskStatus) =>
            updateTaskStatus.mutate({
              id,
              payload: {
                status: currentStatus === 'IN_PROGRESS' ? 'DONE' : 'IN_PROGRESS',
              },
            })
          }
          onDelete={(id) => deleteTask.mutate(id)}
        />
      )}
    </main>
  );
}

