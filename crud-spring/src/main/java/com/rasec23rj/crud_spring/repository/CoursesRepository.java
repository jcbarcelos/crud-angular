package com.rasec23rj.crud_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rasec23rj.crud_spring.models.Courses;

@Repository
public interface CoursesRepository extends JpaRepository<Courses, Long>{
    
}
