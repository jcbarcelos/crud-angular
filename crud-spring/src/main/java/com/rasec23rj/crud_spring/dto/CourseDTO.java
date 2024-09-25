package com.rasec23rj.crud_spring.dto;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.rasec23rj.crud_spring.enums.Category;
import com.rasec23rj.crud_spring.enums.validation.ValueOfEnum;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CourseDTO(
        @JsonProperty("id") Long id,
        @NotNull(message = "Name not null") @Valid @Size(min = 5, max = 100) String name,
        @NotNull   @ValueOfEnum(enumClass = Category.class) String category,
        @NotNull List<LessonDTO> lessons

) {

}
