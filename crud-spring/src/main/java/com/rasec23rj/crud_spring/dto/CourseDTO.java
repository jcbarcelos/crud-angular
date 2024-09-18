package com.rasec23rj.crud_spring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CourseDTO(
        @JsonProperty("id") Long id,
        @NotBlank @NotNull @Size(min = 5, max = 100) String name,
        @NotBlank @NotNull @Pattern(regexp = "Back-End|Front-End") String category) {

}
