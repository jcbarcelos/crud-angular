package com.rasec23rj.crud_spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
