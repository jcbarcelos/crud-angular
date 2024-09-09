package com.rasec23rj.crud_spring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.rasec23rj.crud_spring.models.Courses;
import com.rasec23rj.crud_spring.repository.CoursesRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase( CoursesRepository coursesRepository){
		return args -> {
			coursesRepository.deleteAll();
			Courses c = new Courses();
			c.setName("Spring");
			c.setCategory("back-end");
			coursesRepository.save(c);

			Courses d = new Courses();
			d.setName("Angular");
			d.setCategory("front-end");

			coursesRepository.save(d);
		};
	}
}
