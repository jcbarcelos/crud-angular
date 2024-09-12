package com.rasec23rj.crud_spring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.rasec23rj.crud_spring.models.Courses;
import com.rasec23rj.crud_spring.repository.CoursesRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CoursesController {

    private final CoursesRepository coursesRepository;

    @GetMapping()
    public List<Courses> listCourses() {
        return coursesRepository.findAll();
    }

    @Transactional
    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public Courses saveCourses(@RequestBody Courses courses) {
        return coursesRepository.save(courses);
    }

    @GetMapping("/{id}")
    public Courses getById(@PathVariable("id") Long id) {
        return coursesRepository.findById(id).get();
    }
}
