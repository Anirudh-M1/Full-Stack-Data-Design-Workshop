package com.dfa.workshop.repository;

import com.dfa.workshop.model.CodeSnippet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, Long> {

    List<CodeSnippet> findBySection_Id(Long sectionId);
}
