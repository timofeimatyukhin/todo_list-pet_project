import type { ApiErrorDto } from '../types/api';

const API_BASE_URL = 'http://localhost:8083';

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {

    let message = `HTTP ${response.status}`;
    try {
      const errorBody = (await response.json()) as ApiErrorDto;
      if (errorBody.message) {
        message = errorBody.message;
      }
    } catch (error) {

    }
    throw new Error(message);

  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;

}