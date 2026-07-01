package com.dfa.workshop.dto;

import com.dfa.workshop.model.CodeSnippet;
import com.dfa.workshop.model.WorkshopSection;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Keeps entity <-> DTO mapping in one place instead of scattering it
 * across the controller and service layer.
 */
public final class WorkshopMapper {

    private WorkshopMapper() {
    }

    public static CodeSnippetDTO toDto(CodeSnippet snippet) {
        return new CodeSnippetDTO(
                snippet.getId(),
                snippet.getLanguage(),
                snippet.getCode(),
                snippet.getExpectedOutput()
        );
    }

    public static WorkshopSectionDTO toDto(WorkshopSection section) {
        List<CodeSnippetDTO> snippetDtos = section.getSnippets().stream()
                .map(WorkshopMapper::toDto)
                .collect(Collectors.toList());

        return new WorkshopSectionDTO(
                section.getId(),
                section.getTitle(),
                section.getDurationLabel(),
                section.getSectionOrder(),
                section.getAudioTrackId(),
                section.getAudioTrackLabel(),
                snippetDtos
        );
    }
}
