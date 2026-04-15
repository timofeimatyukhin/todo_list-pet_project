package com.example.todo_backend.exception;

public class OtherException extends RuntimeException{

    public OtherException() {
        super("Unexpected error.");
    }

}
