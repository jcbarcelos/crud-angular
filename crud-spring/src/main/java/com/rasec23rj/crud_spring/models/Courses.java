package com.rasec23rj.crud_spring.models;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.rasec23rj.crud_spring.enums.Category;
import com.rasec23rj.crud_spring.enums.Status;
import com.rasec23rj.crud_spring.enums.converters.CategoryConverter;
import com.rasec23rj.crud_spring.enums.converters.StatusConverter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;



@Entity
@SQLDelete(sql = "UPDATE courses SET status = 'Inactive' WHERE id = ?")
@SQLRestriction(value = "status = 'Active' ")
public class Courses {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @NotEmpty
    @NotBlank
    @Valid
    @Column(nullable = false, length = 100)
    @Size(min = 5, max = 100, message = "Name must be between 5 and 100 characters")
    private String name;

    @NotNull
    @NotEmpty
    @NotBlank
    @Valid
    @Column(nullable = false, length = 100)
    @Size(min = 5, max = 100, message = "Name must be between 5 and 100 characters")
    @Convert(converter = CategoryConverter.class)
    private Category category;

    @NotNull
    @NotEmpty
    @NotBlank
    @Valid
    @Column(nullable = false, length = 10)
    @Convert(converter = StatusConverter.class)
    private Status status = Status.ACTIVE;

    @NotNull
    @NotEmpty
    @NotBlank
    @Valid
    @OneToMany(mappedBy = "courses", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Lesson> lessons = new ArrayList<>();


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<Lesson> getLessons() {
        return this.lessons;
    }

    public void setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
    }

}