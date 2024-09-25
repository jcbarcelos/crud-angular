package com.rasec23rj.crud_spring.dto;

import org.hibernate.validator.constraints.Length;
import jakarta.validation.constraints.NotNull;

public record LessonDTO(
                Long id,
                @NotNull @Length(min = 5, max = 100) String name,
                @NotNull @Length(min = 10, max = 100) String youtubeUrl) {

}
