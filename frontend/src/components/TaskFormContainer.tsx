import { useState, type FormEvent } from 'react';
import TaskForm from './TaskForm';

type CreateTaskValues = {
  title: string;
  text: string;
};

type Props = {
  isSubmitting: boolean;
  onCreate: (values: CreateTaskValues) => void;
};

export default function TaskFormContainer({ isSubmitting, onCreate }: Props) {
  const [values, setValues] = useState<CreateTaskValues>({
    title: '',
    text: '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = values.title.trim();
    const text = values.text.trim();
    if (!title || !text) {
      return;
    }

    onCreate({ title, text });
    setValues({ title: '', text: '' });
  };

  return (
    <TaskForm
      values={values}
      isSubmitting={isSubmitting}
      onTitleChange={(title) => setValues((prev) => ({ ...prev, title }))}
      onTextChange={(text) => setValues((prev) => ({ ...prev, text }))}
      onSubmit={handleSubmit}
    />
  );
}
