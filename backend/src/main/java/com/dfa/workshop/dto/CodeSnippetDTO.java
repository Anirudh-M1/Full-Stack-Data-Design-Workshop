package com.dfa.workshop.dto;

public class CodeSnippetDTO {

    private Long id;
    private String language;
    private String code;
    private String expectedOutput;

    public CodeSnippetDTO() {
    }

    public CodeSnippetDTO(Long id, String language, String code, String expectedOutput) {
        this.id = id;
        this.language = language;
        this.code = code;
        this.expectedOutput = expectedOutput;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }
}
