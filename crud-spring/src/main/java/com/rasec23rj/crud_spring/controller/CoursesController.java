package com.rasec23rj.crud_spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.rasec23rj.crud_spring.models.Courses;
import com.rasec23rj.crud_spring.service.CoursesService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@RestController
@RequestMapping("/api/courses")

public class CoursesController {

    private final CoursesService coursesService;

    CoursesController(CoursesService coursesService) {
        this.coursesService = coursesService;
    }

    @GetMapping()
    public Page<Courses> listCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return coursesService.getCourses(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Courses> getById(@PathVariable("id") @NotNull @Positive Long id) {

        return coursesService.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @Transactional
    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public Courses saveCourses(@RequestBody @Valid Courses courses) {
        return coursesService.save(courses);
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Courses> updateCourses(@PathVariable @NotNull @Positive Long id,
            @RequestBody @Valid Courses courses) {

        return coursesService.findById(id)
                .map(record -> {
                    record.setName(courses.getName());
                    record.setCategory(courses.getCategory());
                    Courses updatedCourses = coursesService.save(record);
                    return ResponseEntity.ok().body(updatedCourses);
                })
                .orElse(ResponseEntity.notFound().build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourses(@PathVariable @NotNull @Positive Long id) {

        return coursesService.findById(id)
                .map(result -> {
                    coursesService.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());

    }

}
