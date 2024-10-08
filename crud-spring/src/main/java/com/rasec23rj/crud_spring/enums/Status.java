package com.rasec23rj.crud_spring.enums;

public enum Status {
    ACTIVE("Active"), INACTIVE("Inactive");

    private String value;

    Status(String value) {
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
