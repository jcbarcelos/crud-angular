package com.rasec23rj.crud_spring.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rasec23rj.crud_spring.enums.Category;
import com.rasec23rj.crud_spring.enums.validation.ValueOfEnum;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CourseDTO(
        @JsonProperty("id") Long id,
        @NotNull @NotEmpty @NotBlank @Valid @Size(min = 5, max = 100) String name,
        @NotNull @NotEmpty @NotBlank @Valid @Length(max = 100) @ValueOfEnum(enumClass = Category.class) String category,
        @NotNull @NotEmpty @NotBlank @Valid List<LessonDTO> lessons

) {

}
