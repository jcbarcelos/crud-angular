package com.rasec23rj.crud_spring.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.rasec23rj.crud_spring.dto.CourseDTO;
import com.rasec23rj.crud_spring.dto.LessonDTO;
import com.rasec23rj.crud_spring.enums.Category;
import com.rasec23rj.crud_spring.models.Courses;
import com.rasec23rj.crud_spring.models.Lesson;

@Component
public class CourseMapper {

    public CourseDTO toDto(Courses courses) {
        if (courses == null) {
            return null;
        }
        List<LessonDTO> lessons = courses.getLessons()
                .stream()
                .map(lesson -> new LessonDTO(lesson.getId(), lesson.getName(),
                        lesson.getYoutubeUrl()))
                .collect(Collectors.toList());

        return new CourseDTO(courses.getId(), courses.getName(), courses.getCategory().getValue(),
         lessons);
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
        courses.setCategory(convertCategoryValue(courseDTO.category()));

     
        List<Lesson> lessons = courseDTO.lessons().stream().map(lessonDTO -> {
            var lesson = new Lesson();
            lesson.setId(lessonDTO.id());
            lesson.setName(lessonDTO.name());
            lesson.setYoutubeUrl(lessonDTO.youtubeUrl());
            lesson.setCourses(courses);
            return lesson;
        }).collect(Collectors.toList());
        courses.setLessons(lessons);
        return courses;
    }

    public Category convertCategoryValue(String category) {
        if (category == null)
            return null;

        return switch (category) {
            case "Front-end" -> Category.FRONT_END;
            case "Back-end" -> Category.FRONT_END;
            default -> throw new IllegalArgumentException("Invalid category value: " + category);

        };
    }

}
