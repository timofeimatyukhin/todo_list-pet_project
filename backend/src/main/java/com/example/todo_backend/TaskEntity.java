package com.example.todo_backend;

import jakarta.persistence.*;

@Table(name="tasks")
@Entity
public class TaskEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="title")
    String title;

    @Column(name="text")
    String text;

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    TaskStatus status;

    public TaskEntity() {
    }

    public TaskEntity(Long id, String title, String text, TaskStatus status) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title ) {
        this.title = title;
    }
}
