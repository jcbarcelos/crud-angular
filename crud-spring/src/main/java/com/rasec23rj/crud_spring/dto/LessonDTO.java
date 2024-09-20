package com.rasec23rj.crud_spring.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LessonDTO(
        Long id,
       @NotBlank @NotNull String name,
       @NotBlank @NotNull String youtubeUrl) {

}
