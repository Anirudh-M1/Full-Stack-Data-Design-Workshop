package com.dfa.workshop.controller;

import com.dfa.workshop.dto.WorkshopSectionDTO;
import com.dfa.workshop.service.WorkshopService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Exposes the workshop content as a versioned REST API.
 * Thin by design: no business logic here, just HTTP <-> service wiring.
 */
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class WorkshopController {

    private final WorkshopService workshopService;

    public WorkshopController(WorkshopService workshopService) {
        this.workshopService = workshopService;
    }

    /** GET /api/v1/sections - all workshop sections in order, each with its code snippets. */
    @GetMapping("/sections")
    public ResponseEntity<List<WorkshopSectionDTO>> getAllSections() {
        return ResponseEntity.ok(workshopService.getAllSections());
    }

    /** GET /api/v1/sections/{id} - a single section by its database id. */
    @GetMapping("/sections/{id}")
    public ResponseEntity<WorkshopSectionDTO> getSectionById(@PathVariable Long id) {
        return ResponseEntity.ok(workshopService.getSectionById(id));
    }

    /** GET /api/v1/tracks/{trackId} - look up a section by its narrator audio track id (e.g. "ap-cell1"). */
    @GetMapping("/tracks/{trackId}")
    public ResponseEntity<WorkshopSectionDTO> getSectionByTrack(@PathVariable String trackId) {
        return ResponseEntity.ok(workshopService.getSectionByTrackId(trackId));
    }
}
