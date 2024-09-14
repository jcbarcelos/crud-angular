package com.rasec23rj.crud_spring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.rasec23rj.crud_spring.models.Courses;
import com.rasec23rj.crud_spring.repository.CoursesRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CoursesController {

    private final CoursesRepository coursesRepository;

    @GetMapping()
    public List<Courses> listCourses() {
        return coursesRepository.findStatus();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Courses> getById(@PathVariable("id") @NotNull @Positive Long id) {

        return coursesRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @Transactional
    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public Courses saveCourses(@RequestBody @Valid Courses courses) {
        return coursesRepository.save(courses);
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Courses> updateCourses(@PathVariable @NotNull @Positive Long id,
            @RequestBody @Valid Courses courses) {

        return coursesRepository.findById(id)
                .map(record -> {
                    record.setName(courses.getName());
                    record.setCategory(courses.getCategory());
                    Courses updatedCourses = coursesRepository.save(record);
                    return ResponseEntity.ok().body(updatedCourses);
                })
                .orElse(ResponseEntity.notFound().build());

    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourses(@PathVariable @NotNull @Positive Long id) {

        return coursesRepository.findById(id)
                .map(record -> {
                    coursesRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());

    }

}
