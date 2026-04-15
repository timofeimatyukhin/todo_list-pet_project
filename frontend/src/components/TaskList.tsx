import type { TaskDto } from '../types/task';

type Drafts = Record<number, { title: string; text: string }>;

type Props = {
  tasks: TaskDto[];
  drafts: Drafts;
  isSubmitting: boolean;
  onTitleChange: (id: number, value: string) => void;
  onTextChange: (id: number, value: string) => void;
  onUpdate: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: TaskDto['status']) => void;
  onDelete: (id: number) => void;
};

export default function TaskList({
  tasks,
  drafts,
  isSubmitting,
  onTitleChange,
  onTextChange,
  onUpdate,
  onToggleStatus,
  onDelete,
}: Props) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <div>
            <strong>{task.title}</strong> - {task.status}
          </div>
          <div>{task.text}</div>
          <div>
            <input
              value={drafts[task.id]?.title ?? ''}
              onChange={(event) => onTitleChange(task.id, event.target.value)}
              placeholder="New title"
            />
            <input
              value={drafts[task.id]?.text ?? ''}
              onChange={(event) => onTextChange(task.id, event.target.value)}
              placeholder="New text"
            />
            <button type="button" disabled={isSubmitting} onClick={() => onUpdate(task.id)}>
              Update
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => onToggleStatus(task.id, task.status)}
            >
              Toggle status
            </button>
            <button type="button" disabled={isSubmitting} onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
