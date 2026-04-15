package com.example.todo_backend.service;

import com.example.todo_backend.*;
import com.example.todo_backend.exception.NotFoundException;
import com.example.todo_backend.exception.NoResultException;
import com.example.todo_backend.exception.IllegalArgumentException;
import com.example.todo_backend.exception.OtherException;
import com.example.todo_backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public Task getTaskById(
            Long id
    ) {
        TaskEntity taskEntity = repository.findById(id)
                .orElseThrow(() -> new NotFoundException(id));
        return toDomainTask(taskEntity);
    }

    public List<Task> getAllTasks() {

        List<TaskEntity> allTasks = repository.findAll();

        if (allTasks.size() == 0) {
            throw new NoResultException();
        }
        return allTasks.stream()
                .map(this::toDomainTask)
                .toList();
    }

    public Task createTask(
            Task taskToCreate
    ) {

        if (taskToCreate.id() != null) {
            throw new IllegalArgumentException();
        }

        if (taskToCreate.status() != null) {
            throw new IllegalArgumentException();
        }

        var taskToSave = new TaskEntity(
                null,
                taskToCreate.title(),
                taskToCreate.text(),
                TaskStatus.IN_PROGRESS
        );

        var savedEntity = repository.save(taskToSave);

        return(toDomainTask(savedEntity));
    }


    public Task updateTask(
            Long id,
            UpdateTask taskToUpdate
    ) {

        TaskEntity entity = repository.findById(id)
                .orElseThrow(() -> new NotFoundException(id));

        entity.setTitle(taskToUpdate.title());
        entity.setText(taskToUpdate.text());

        TaskEntity saved = repository.save(entity);

        return toDomainTask(saved);

    }


    private Task toDomainTask(
            TaskEntity taskEntity
    ){
        return new Task(
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getText(),
                taskEntity.getStatus()
        );
    }


    public void deleteTask(
            Long id
    ) {
        TaskEntity entity = repository.findById(id)
                .orElseThrow(() -> new NotFoundException(id));

        repository.deleteById(id);
    }

    public Task updateStatusTask(
            Long id,
            UpdateTaskStatus statusToUpdate
    ) {

        TaskEntity taskToUpdate = repository.findById(id)
                .orElseThrow(() -> new NotFoundException(id));

        taskToUpdate.setStatus(statusToUpdate.status());

        TaskEntity saved = repository.save(taskToUpdate);

        return toDomainTask(saved);

    }
}
