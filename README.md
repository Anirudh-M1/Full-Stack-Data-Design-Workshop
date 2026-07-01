# DFA Workshop — Full-Stack Refactor

I created this workshop to help students and builders turn raw data into clear, meaningful, and actionable insights through design. In a world full of data, making sense of it is just as important as collecting it. Through my work in Design for America, I’ve seen how communicating data insights effectively can lead to definitive impact and efficient solutions. 

This project is a complete full-stack refactor of that core material. To help my peers learn both data engineering and solid software architecture, I took the original content and split it into a clean, decoupled full-stack system.

* **`backend/`** — A solid Spring Boot REST API (Java 17, Spring Data JPA, H2 in-memory DB).
* **`frontend/`** — A lightweight, independent client (HTML/CSS/JS) that dynamically talks to the API.

---

## Why the Backend Architecture Makes Sense

I built this with a strict separation of concerns so we don't leak database logic into the client or mix business logic with our endpoints. It serves as a blueprint for how information should be structured, visualized, and understood in a real-world application.

* **`model/`**: Houses `WorkshopSection` and `CodeSnippet` as JPA entities, mapped out with a `@OneToMany` / `@ManyToOne` relationship.
* **`dto/`**: Used `WorkshopSectionDTO`, `CodeSnippetDTO`, and a custom `WorkshopMapper` here. This keeps our raw database entities hidden from the API layer entirely.
* **`repository/`**: Clean `WorkshopSectionRepository` and `CodeSnippetRepository` layers extending `JpaRepository` to handle standard CRUD operations.
* **`service/`**: This is where the actual business logic lives (`WorkshopService` interface and its `WorkshopServiceImpl`). The controllers never talk directly to the repositories.
* **`controller/`**: A slim `@RestController` that acts strictly as a traffic cop for our REST endpoints.
* **`exception/`**: Set up a centralized global exception handler using `@ControllerAdvice`. If someone passes a bad ID or a resource isn't found, it returns a clean, structured `ApiError` JSON payload instead of blowing up the client with a massive, messy stack trace.
* **`resources/`**: Houses `application.properties` and a `data.sql` file. The SQL script automatically seeds the H2 database on startup with our actual workshop content (*Setup & Libraries, Python Basics, Your First Chart, Real Data, Final Visualization*).

### The Endpoints
* `GET /api/v1/sections` — Grabs all available workshop sections.
* `GET /api/v1/sections/{id}` — Grabs a specific section by its ID.
* `GET /api/v1/tracks/{trackId}` — Grabs sections filtered by specific tracks.

---

## Cleaning Up the Frontend

The original frontend was pretty monolithic, so I spent some time modularizing it and clearing out the technical debt:

* **Separated Concerns**: Pulled all the inline styles out into `styles.css` and moved all the execution logic over to `app.js`. Now, `index.html` is just a clean, semantic skeleton.
* **Nuked Dead Code**: Found a legacy, completely unused navigation script block (`goHome`/`goAbout`) hanging out in the old file and deleted it to keep things tidy. Only the real, working UI wiring (`window.goHome`/`window.goTo`) remains.
* **Going Dynamic**: The `app.js` script hits `GET /api/v1/sections` as soon as the page loads to dynamically grab and render the labels right from our backend. I also baked in a local fallback array, so if the API isn't running, the static frontend still gracefully works standalone.

---

## How to Run It Locally

> **Heads Up**: Make sure you're connected to the internet the first time you run this so Maven can pull down all the initial dependencies from Maven Central.

### 1. Spin up the Backend
```bash
cd backend
mvn spring-boot:run