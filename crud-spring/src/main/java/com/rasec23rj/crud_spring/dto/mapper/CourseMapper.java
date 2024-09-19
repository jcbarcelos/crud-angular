package com.rasec23rj.crud_spring.dto.mapper;

import org.springframework.stereotype.Component;

import com.rasec23rj.crud_spring.dto.CourseDTO;
import com.rasec23rj.crud_spring.models.Courses;

@Component
public class CourseMapper {

    public CourseDTO toDto(Courses courses) {
        if (courses == null) {
            return null;
        }
        return new CourseDTO(courses.getId(), courses.getName(), courses.getCategory(), courses.getStatus());
    }

    public Courses toEntity(CourseDTO courseDTO) {
        if (courseDTO == null) {
            return null;
        }
        Courses courses = new Courses();
        if (courseDTO.id() != null) {
            courses.setId(courseDTO.id());
        }
        courses.setName(courseDTO.name());
        courses.setCategory(courseDTO.category());
        return courses;
    }

}
