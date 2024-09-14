package com.rasec23rj.crud_spring.models;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.Where;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@SQLDelete(sql = "UPDATE courses set status = 'Inative' where id = ?")
@SQLRestriction(value =  "status = 'Inative' ")

public class Courses {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 100)
    @NotNull(message = "Name cannot be null")
    @Size(min = 5, max = 100, message = "Name must be between 5 and 100 characters")
    private String name;

    @NotBlank
    @Column(nullable = false, length = 200)
    @NotNull(message = "Category cannot be null")
    @Pattern(regexp = "Back-End|Front-End", message = "Category must be either 'Back-End' or 'Front-End'")
    @Size(min = 5, max = 100, message = "Category must be between 5 and 100 characters")
    private String category;

    @NotBlank
    @Column(nullable = false, length = 10, name = "status")
    @NotNull(message = "Status cannot be null")
    @Pattern(regexp = "Active|Inative", message = "Status must be either 'Active' or 'Inative'")
    @Size(max = 10, message = "Status must be max 10 characters")
    private String status = "Active";
}
