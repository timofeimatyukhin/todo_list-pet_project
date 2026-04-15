package com.example.todo_backend.exception;

public class NoResultException extends RuntimeException{

    public NoResultException() {

        super("No result found.");

    }

}
