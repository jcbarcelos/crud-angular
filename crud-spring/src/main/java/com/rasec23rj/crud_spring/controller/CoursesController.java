package com.rasec23rj.crud_spring.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public Courses saveCourses(@RequestBody Courses courses) {
        return coursesRepository.save(courses);
    }

}
