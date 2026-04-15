package com.example.todo_backend.controller;


import com.example.todo_backend.Task;
import com.example.todo_backend.UpdateTask;
import com.example.todo_backend.UpdateTaskStatus;
import com.example.todo_backend.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.NotActiveException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/task")
public class TaskController {

    private static Logger log = LoggerFactory.getLogger(TaskController.class);

    private final TaskService taskService;


    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById (
    @PathVariable("id") Long id
    ) {
        log.info("Called getTaskById, id=" + id);
        taskService.getTaskById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(taskService.getTaskById(id));

    }

    @GetMapping()
    public ResponseEntity<List<Task>> getAllTasks () {
        log.info("Called getAllTasks method");
        return ResponseEntity.ok(taskService.getAllTasks());


    }

    @PostMapping()
    public ResponseEntity<Task> createTask(
        @RequestBody Task taskToCreate
    ) {
        log.info("Called createTask method");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taskService.createTask(taskToCreate));

    }


    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable("id") Long id,
            @RequestBody UpdateTask taskToUpdate
    ) {

        log.info("Called updateTask method with id =" + id);
        return ResponseEntity.ok(taskService.updateTask(id, taskToUpdate));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable("id") Long id
    ) {
        log.info("Called deleteTask method with id=" + id);
        taskService.deleteTask(id);
        return ResponseEntity.noContent()
                .build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Task> updateStatusTask(
            @PathVariable("id") Long id,
            @RequestBody  UpdateTaskStatus statusToUpdate
    ) {
        log.info("Called updateStatusTask method with id=" + id);
        return ResponseEntity.ok(taskService.updateStatusTask(id, statusToUpdate));
    }

}
