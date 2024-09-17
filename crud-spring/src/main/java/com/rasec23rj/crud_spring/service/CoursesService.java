package com.rasec23rj.crud_spring.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import com.rasec23rj.crud_spring.exception.RecordNotFoundException;
import com.rasec23rj.crud_spring.models.Courses;
import com.rasec23rj.crud_spring.repository.CoursesRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CoursesService {

    private final CoursesRepository coursesRepository;

    CoursesService(CoursesRepository coursesRepository) {
        this.coursesRepository = coursesRepository;
    }

    public Page<Courses> getCourses(Pageable pageable) {
        return coursesRepository.findAll(pageable);
    }

    public Courses findById(@PathVariable @NotNull @Positive Long id) {
        return coursesRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public Courses save(@Valid Courses courses) {
        return coursesRepository.save(courses);
    }

    public Courses update(@NotNull @Positive Long id, @Valid Courses courses) {

        return coursesRepository.findById(id)
                .map(record -> {
                    record.setName(courses.getName());
                    record.setCategory(courses.getCategory());
                    return coursesRepository.save(record);

                }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@PathVariable @NotNull @Positive @Positive Long id) {
        coursesRepository.delete(coursesRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
