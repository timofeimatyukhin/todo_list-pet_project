import { useEffect, useState } from 'react';
import type { TaskDto } from '../types/task';
import TaskList from './TaskList';

type Drafts = Record<number, { title: string; text: string }>;

type Props = {
  tasks: TaskDto[];
  isSubmitting: boolean;
  onUpdate: (id: number, payload: { title: string; text: string }) => void;
  onToggleStatus: (id: number, status: TaskDto['status']) => void;
  onDelete: (id: number) => void;
};

export default function TaskListContainer({
  tasks,
  isSubmitting,
  onUpdate,
  onToggleStatus,
  onDelete,
}: Props) {
  const [drafts, setDrafts] = useState<Drafts>({});

  useEffect(() => {
    setDrafts((prev) => {
      const next: Drafts = {};
      for (const task of tasks) {
        next[task.id] = prev[task.id] ?? { title: task.title, text: task.text };
      }
      return next;
    });
  }, [tasks]);

  return (
    <TaskList
      tasks={tasks}
      drafts={drafts}
      isSubmitting={isSubmitting}
      onTitleChange={(id, value) =>
        setDrafts((prev) => ({
          ...prev,
          [id]: { ...prev[id], title: value },
        }))
      }
      onTextChange={(id, value) =>
        setDrafts((prev) => ({
          ...prev,
          [id]: { ...prev[id], text: value },
        }))
      }
      onUpdate={(id) => {
        const draft = drafts[id];
        if (!draft) {
          return;
        }
        const title = draft.title.trim();
        const text = draft.text.trim();
        if (!title || !text) {
          return;
        }
        onUpdate(id, { title, text });
      }}
      onToggleStatus={onToggleStatus}
      onDelete={onDelete}
    />
  );
}
