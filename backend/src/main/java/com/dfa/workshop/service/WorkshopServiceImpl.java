package com.dfa.workshop.service;

import com.dfa.workshop.dto.WorkshopMapper;
import com.dfa.workshop.dto.WorkshopSectionDTO;
import com.dfa.workshop.exception.ResourceNotFoundException;
import com.dfa.workshop.model.WorkshopSection;
import com.dfa.workshop.repository.WorkshopSectionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Business logic lives here, not in the controller. The controller's
 * only job is translating HTTP <-> service calls.
 */
@Service
@Transactional(readOnly = true)
public class WorkshopServiceImpl implements WorkshopService {

    private final WorkshopSectionRepository sectionRepository;

    public WorkshopServiceImpl(WorkshopSectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    @Override
    public List<WorkshopSectionDTO> getAllSections() {
        return sectionRepository.findAllByOrderBySectionOrderAsc().stream()
                .map(WorkshopMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public WorkshopSectionDTO getSectionById(Long id) {
        WorkshopSection section = sectionRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forSection(id));
        return WorkshopMapper.toDto(section);
    }

    @Override
    public WorkshopSectionDTO getSectionByTrackId(String trackId) {
        WorkshopSection section = sectionRepository.findByAudioTrackId(trackId)
                .orElseThrow(() -> ResourceNotFoundException.forTrack(trackId));
        return WorkshopMapper.toDto(section);
    }
}
