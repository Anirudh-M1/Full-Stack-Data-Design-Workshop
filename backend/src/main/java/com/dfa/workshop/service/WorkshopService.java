package com.dfa.workshop.service;

import com.dfa.workshop.dto.WorkshopSectionDTO;

import java.util.List;

public interface WorkshopService {

    List<WorkshopSectionDTO> getAllSections();

    WorkshopSectionDTO getSectionById(Long id);

    WorkshopSectionDTO getSectionByTrackId(String trackId);
}
