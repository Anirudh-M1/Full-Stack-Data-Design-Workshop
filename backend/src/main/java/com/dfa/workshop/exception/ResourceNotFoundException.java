package com.dfa.workshop.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public static ResourceNotFoundException forSection(Long id) {
        return new ResourceNotFoundException("No workshop section found with id " + id);
    }

    public static ResourceNotFoundException forTrack(String trackId) {
        return new ResourceNotFoundException("No workshop section found with audio track id '" + trackId + "'");
    }
}
