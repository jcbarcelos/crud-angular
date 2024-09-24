package com.rasec23rj.crud_spring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.rasec23rj.crud_spring.dto.CourseDTO;
import com.rasec23rj.crud_spring.dto.CoursePageDTO;
import com.rasec23rj.crud_spring.dto.mapper.CourseMapper;
import com.rasec23rj.crud_spring.exception.RecordNotFoundException;
import com.rasec23rj.crud_spring.models.Courses;
import com.rasec23rj.crud_spring.repository.CoursesRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Validated
@Service
public class CoursesService {

    private final CoursesRepository coursesRepository;
    private final CourseMapper courseMapper;

    CoursesService(CoursesRepository coursesRepository, CourseMapper courseMapper) {
        this.coursesRepository = coursesRepository;
        this.courseMapper = courseMapper;
    }

    public CoursePageDTO getCourses(@PositiveOrZero int page, @Positive @Max(100) int pageSize) {
        Page<Courses> pageCourse = coursesRepository.findAll(PageRequest.of(page, pageSize));
        List<CourseDTO> courses = pageCourse.get().map(courseMapper::toDto).collect(Collectors.toList());
        return new CoursePageDTO(courses, pageCourse.getTotalElements(), pageCourse.getTotalPages());

    }

    public CourseDTO findById(@NotNull @Positive Long id) {
        return coursesRepository.findById(id)
                .map(courseMapper::toDto)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CourseDTO save(@Valid @NotNull CourseDTO courses) {
        return courseMapper.toDto(coursesRepository.save(courseMapper.toEntity(courses)));
    }

    public CourseDTO update(@NotNull @Positive Long id, @Valid @NotNull CourseDTO coursesDTO) {

        return coursesRepository.findById(id)
                .map(record -> {
                    Courses courses = courseMapper.toEntity(coursesDTO);
                    record.setName(coursesDTO.name());
                    record.setCategory(courseMapper.convertCategoryValue(coursesDTO.category()));
                    record.getLessons().clear();
                    courses.getLessons().forEach(record.getLessons()::add);
                    return courseMapper.toDto(coursesRepository.save(record));
                })
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@NotNull @Positive @Positive Long id) {
        coursesRepository.delete(coursesRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
