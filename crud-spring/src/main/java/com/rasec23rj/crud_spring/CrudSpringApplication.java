package com.rasec23rj.crud_spring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

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
	@Profile("test")
	CommandLineRunner initDatabase(CoursesRepository courseRepository) {
		return args -> {
			courseRepository.deleteAll();

			for (int i = 0; i < 20; i++) {

				Courses c = new Courses();
				c.setName("Angular com Spring " + i);
				c.setCategory(Category.BACK_END);

				Lesson l = new Lesson();
				l.setName("Introdução");
				l.setYoutubeUrl("01234567890");
				l.setCourses(c);
				c.getLessons().add(l);

				Lesson l1 = new Lesson();
				l1.setName("Angular");
				l1.setYoutubeUrl("01234567891");
				l1.setCourses(c);
				c.getLessons().add(l1);

				courseRepository.save(c);
			}
		};
	}
}
