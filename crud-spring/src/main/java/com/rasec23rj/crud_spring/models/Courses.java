package com.rasec23rj.crud_spring.models;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.rasec23rj.crud_spring.enums.Category;
import com.rasec23rj.crud_spring.enums.Status;
import com.rasec23rj.crud_spring.enums.converters.CategoryConverter;
import com.rasec23rj.crud_spring.enums.converters.StatusConverter;


import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@SQLDelete(sql = "UPDATE courses SET status = 'Inativo' WHERE id = ?")
@SQLRestriction(value =  "status = 'Active' ")

public class Courses {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 100)
    @NotNull(message = "Name cannot be null")
    @Size(min = 5, max = 100, message = "Name must be between 5 and 100 characters")
    private String name;

    @Column(nullable = false, length = 10)
    @Convert(converter = CategoryConverter.class)
    private Category category;

    @Column(nullable = false, length = 10, columnDefinition = "Active")
    @Convert(converter = StatusConverter.class)
    private Status status = Status.ACTIVE;
}