package com.rasec23rj.crud_spring.enums;

public enum Category {
    BACKEND("Back-end"), FRONTEND("Front-end");

    private String value;

    Category(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }
}
