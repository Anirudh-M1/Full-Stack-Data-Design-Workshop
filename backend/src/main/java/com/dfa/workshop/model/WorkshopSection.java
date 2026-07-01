package com.dfa.workshop.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a single step of the workshop (e.g. "Setup & Libraries",
 * "Your First Chart"). This is the Java-side model of what used to be
 * hardcoded in the SEC_TRACK / LABELS JavaScript objects.
 */
@Entity
@Table(name = "workshop_sections")
public class WorkshopSection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String title;

    /** e.g. "45-minute hands-on" */
    private String durationLabel;

    /** Order in which the section appears in the workshop flow (0-indexed). */
    @Column(name = "section_order", nullable = false)
    private Integer sectionOrder;

    /** Identifier of the narrator audio track tied to this section, e.g. "ap-cell1". */
    @Column(name = "audio_track_id")
    private String audioTrackId;

    @Column(name = "audio_track_label")
    private String audioTrackLabel;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @OrderBy("id ASC")
    @JsonManagedReference
    private List<CodeSnippet> snippets = new ArrayList<>();

    protected WorkshopSection() {
        // required by JPA
    }

    public WorkshopSection(String title, String durationLabel, Integer sectionOrder,
                            String audioTrackId, String audioTrackLabel) {
        this.title = title;
        this.durationLabel = durationLabel;
        this.sectionOrder = sectionOrder;
        this.audioTrackId = audioTrackId;
        this.audioTrackLabel = audioTrackLabel;
    }

    public Long getId() {
        return id;
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

    public List<CodeSnippet> getSnippets() {
        return snippets;
    }

    public void addSnippet(CodeSnippet snippet) {
        snippets.add(snippet);
        snippet.setSection(this);
    }
}
