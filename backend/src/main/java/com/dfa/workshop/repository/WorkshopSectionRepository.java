package com.dfa.workshop.repository;

import com.dfa.workshop.model.WorkshopSection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkshopSectionRepository extends JpaRepository<WorkshopSection, Long> {

    List<WorkshopSection> findAllByOrderBySectionOrderAsc();

    Optional<WorkshopSection> findByAudioTrackId(String audioTrackId);
}
