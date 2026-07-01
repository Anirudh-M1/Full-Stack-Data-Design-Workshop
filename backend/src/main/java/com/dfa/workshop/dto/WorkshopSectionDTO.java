package com.dfa.workshop.dto;

import java.util.List;

public class WorkshopSectionDTO {

    private Long id;
    private String title;
    private String durationLabel;
    private Integer sectionOrder;
    private String audioTrackId;
    private String audioTrackLabel;
    private List<CodeSnippetDTO> snippets;

    public WorkshopSectionDTO() {
    }

    public WorkshopSectionDTO(Long id, String title, String durationLabel, Integer sectionOrder,
                               String audioTrackId, String audioTrackLabel, List<CodeSnippetDTO> snippets) {
        this.id = id;
        this.title = title;
        this.durationLabel = durationLabel;
        this.sectionOrder = sectionOrder;
        this.audioTrackId = audioTrackId;
        this.audioTrackLabel = audioTrackLabel;
        this.snippets = snippets;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDurationLabel() {
        return durationLabel;
    }

    public void setDurationLabel(String durationLabel) {
        this.durationLabel = durationLabel;
    }

    public Integer getSectionOrder() {
        return sectionOrder;
    }

    public void setSectionOrder(Integer sectionOrder) {
        this.sectionOrder = sectionOrder;
    }

    public String getAudioTrackId() {
        return audioTrackId;
    }

    public void setAudioTrackId(String audioTrackId) {
        this.audioTrackId = audioTrackId;
    }

    public String getAudioTrackLabel() {
        return audioTrackLabel;
    }

    public void setAudioTrackLabel(String audioTrackLabel) {
        this.audioTrackLabel = audioTrackLabel;
    }

    public List<CodeSnippetDTO> getSnippets() {
        return snippets;
    }

    public void setSnippets(List<CodeSnippetDTO> snippets) {
        this.snippets = snippets;
    }
}
