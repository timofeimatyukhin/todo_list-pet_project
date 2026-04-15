package com.example.todo_backend.exception;

public class IllegalArgumentException extends RuntimeException {

    public IllegalArgumentException() {
        super("Id and status of task should be empty.");
    }

}
