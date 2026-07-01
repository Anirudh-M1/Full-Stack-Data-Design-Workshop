# DFA Workshop — Full-Stack Refactor

Two parts:

- **`backend/`** — Spring Boot REST API (Java 17, Spring Data JPA, H2)
- **`frontend/`** — Static client (`index.html`, `styles.css`, `app.js`) that calls the API

## Backend — what's actually in it

- `model/` — `WorkshopSection` and `CodeSnippet` JPA entities (`@Entity`, `@OneToMany`/`@ManyToOne`)
- `dto/` — `WorkshopSectionDTO`, `CodeSnippetDTO`, and a `WorkshopMapper` so the API never leaks JPA entities directly
- `repository/` — `WorkshopSectionRepository` / `CodeSnippetRepository`, both `JpaRepository`
- `service/` — `WorkshopService` interface + `WorkshopServiceImpl`; controllers never touch the repository directly
- `controller/` — `WorkshopController`, a thin `@RestController` exposing:
  - `GET /api/v1/sections`
  - `GET /api/v1/sections/{id}`
  - `GET /api/v1/tracks/{trackId}`
- `exception/` — `ResourceNotFoundException`, `ApiError`, and a `@ControllerAdvice` `GlobalExceptionHandler` that turns unhandled errors into clean JSON (404s, 400s on validation, 500s) instead of stack traces
- `resources/application.properties` + `data.sql` — H2 in-memory DB, seeded on startup with the real workshop content (Setup & Libraries, Python Basics, Your First Chart, Real Data, Final Visualization)

### Running it

You'll need Maven and a connection to Maven Central (I couldn't build/test this in my sandbox — no network access to Maven Central there — so **build and run this locally before your interview** to confirm it compiles clean):

```bash
cd backend
mvn spring-boot:run
```

Then check:
- `http://localhost:8080/api/v1/sections`
- `http://localhost:8080/api/v1/sections/1`
- `http://localhost:8080/api/v1/sections/99` → clean 404 JSON, not a stack trace
- `http://localhost:8080/h2-console` → JDBC URL `jdbc:h2:mem:workshopdb`

## Frontend — what changed

- All CSS pulled out of the inline `<style>` block into `styles.css`
- All JS pulled out of inline `<script>` blocks into `app.js`
- `index.html` is now a lean shell that links both
- Dropped a dead, superseded `goHome`/`goAbout`/`current` script block that the original file had sitting unused above the real navigation logic (the second script's `window.goHome`/`window.goTo` were the ones actually wired to the UI — worth mentioning if a dev asks, it shows you read the whole file, not just skimmed it)
- `app.js` now calls `GET /api/v1/sections` on load to pull section labels from the Java backend, with a local fallback if the API isn't running, so the static page still works standalone

## What I intentionally did NOT do

- Didn't move the narrator subtitle transcripts (`SUBS`) or embedded base64 audio into the database — that's a real next step (blob storage or serving audio as static assets + a `Transcript` entity) but wasn't necessary to prove out the architecture, and calling it out as a "next iteration" item is more credible than pretending it's already done.
- Didn't add Spring Security / auth — not needed for a read-only public content API, but worth naming if asked "what would you add for production."

## Honesty note

This started as a Python data-viz workshop site. It's now genuinely backed by a Java/Spring Boot service with real layering (controller → service → repository → DB) and proper error handling — this isn't a re-skin, the backend logic is real and testable. Be ready to walk through *why* each layer exists (separation of concerns, testability, not letting business logic leak into controllers) since that's what a dev interviewer will actually probe.
