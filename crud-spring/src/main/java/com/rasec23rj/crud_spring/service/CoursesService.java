package com.rasec23rj.crud_spring.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.rasec23rj.crud_spring.models.Courses;
import com.rasec23rj.crud_spring.repository.CoursesRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service

public class CoursesService {

    private final CoursesRepository coursesRepository;

    CoursesService(CoursesRepository coursesRepository) {
        this.coursesRepository = coursesRepository;
    }

    public Page<Courses> getCourses(Pageable pageable) {
        return coursesRepository.findAll(pageable);
    }

    public Courses save(@Valid Courses courses) {
        return coursesRepository.save(courses);
    }

    public Optional<Courses> findById(@NotNull @Positive Long id) {
        return coursesRepository.findById(id);
    }

    public void deleteById(@Positive Long id) {
        coursesRepository.deleteById(id);
    }
}
