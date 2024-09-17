package com.rasec23rj.crud_spring.exception;

import com.fasterxml.jackson.databind.RuntimeJsonMappingException;

public class RecordNotFoundException extends RuntimeJsonMappingException {
    private static final long serialVersionUID = 1L;

    public RecordNotFoundException(Long id) {
        super("Registro não encontrado com o id: " + id);

    }

}
