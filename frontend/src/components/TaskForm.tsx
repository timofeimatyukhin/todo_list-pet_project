import type { FormEvent } from 'react';

type CreateTaskValues = {
  title: string;
  text: string;
};

type Props = {
  values: CreateTaskValues;
  isSubmitting: boolean;
  onTitleChange: (value: string) => void;
  onTextChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function TaskForm({
  values,
  isSubmitting,
  onTitleChange,
  onTextChange,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={values.title}
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder="Title"
      />
      <input
        value={values.text}
        onChange={(event) => onTextChange(event.target.value)}
        placeholder="Text"
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create task'}
      </button>
    </form>
  );
}