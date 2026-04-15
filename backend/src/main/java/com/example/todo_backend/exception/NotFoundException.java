package com.example.todo_backend.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(Long id) {
        super("Task with id " + id + " not found.");
    }
}
