package com.example.todo_backend;

public record Task(
        Long id,
        String title,
        String text,
        TaskStatus status
) {
}
