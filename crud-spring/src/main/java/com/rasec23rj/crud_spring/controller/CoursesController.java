package com.rasec23rj.crud_spring.controller;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
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

import com.rasec23rj.crud_spring.dto.CourseDTO;
import com.rasec23rj.crud_spring.dto.CoursePageDTO;
import com.rasec23rj.crud_spring.service.CoursesService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;

@Validated
@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CoursesController {

    private final CoursesService coursesService;

    @GetMapping()
    public CoursePageDTO listCourses(
          @RequestParam(defaultValue = "0") @PositiveOrZero int page,
            @RequestParam(defaultValue = "10") @Positive @Max(100) int pageSize) {
        return coursesService.getCourses(page, pageSize);
    }

    @GetMapping("/{id}")
    public CourseDTO getById(@PathVariable @NotNull @Positive Long id) {
        return coursesService.findById(id);
    }

    @Transactional
    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public CourseDTO saveCourses(@RequestBody @Valid CourseDTO courses) {
        return coursesService.save(courses);
    }

    @Transactional
    @PutMapping("/{id}")
    public CourseDTO updateCourses(@PathVariable @NotNull @Positive Long id,
            @RequestBody @Valid CourseDTO courses) {
        return coursesService.update(id, courses);
    }

    @Transactional
    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteCourses(@PathVariable @NotNull @Positive Long id) {
        coursesService.delete(id);
    }

}
