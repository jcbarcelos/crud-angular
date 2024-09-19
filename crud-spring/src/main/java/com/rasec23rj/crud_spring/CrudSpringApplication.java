package com.rasec23rj.crud_spring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.rasec23rj.crud_spring.enums.Category;
import com.rasec23rj.crud_spring.models.Courses;
import com.rasec23rj.crud_spring.models.Lesson;
import com.rasec23rj.crud_spring.repository.CoursesRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CoursesRepository coursesRepository) {
		return args -> {
			coursesRepository.deleteAll();

			Courses course = new Courses();
			course.setName("Curso de Java");
			course.setCategory(Category.BACKEND);

			Lesson lesson = new Lesson();
			lesson.setName("Curso de Java");
			lesson.setYoutubeUrl("z0KnFGCWB_wQOJ0t");
			lesson.setCourses(course);

			course.getLessons().add(lesson);

			coursesRepository.save(course);

		};
	}
}
