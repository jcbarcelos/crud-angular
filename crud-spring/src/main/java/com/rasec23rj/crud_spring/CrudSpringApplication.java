package com.rasec23rj.crud_spring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.rasec23rj.crud_spring.repository.CoursesRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	// @Bean
	// CommandLineRunner initDatabase(CoursesRepository coursesRepository) {
	// 	return args -> {
	// 		coursesRepository.deleteAll();

	// 	};
	// }
}
