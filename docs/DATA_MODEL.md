# PARAMPARA AI — Data Model & Lifecycle Specification

## 1. Entity Relationship Diagram

```mermaid
erDiagram
    PROFILES ||--o{ ARTISANS : owns
    PROFILES ||--o{ CRAFT_STORIES : contributes
    PROFILES ||--o{ CLAIM_REVIEWS : reviews
    CRAFTS ||--o{ SOURCES : backed_by
    CRAFTS ||--o{ CLAIM_REVIEWS : contains
    CRAFTS ||--o{ CRAFT_STORIES : documented_in
    CRAFTS ||--o{ PRODUCTS : categorizes
    ARTISANS ||--o{ PRODUCTS : creates
    CRAFT_STORIES ||--|| CONSENT_RECORDS : authorized_by
    CRAFTS ||--o{ KNOWLEDGE_CHUNKS : indexed_as
```

---

## 2. Claim-Level Status State Machine

A critical differentiator of PARAMPARA AI is that **records are not treated as a monolithic binary "verified/unverified" checkbox**. Individual factual claims carry distinct evidential states:

```mermaid
stateDiagram-v2
    [*] --> ai_suggested : AI Multimodal Draft
    [*] --> contributor_provided : Artisan Spoken Input
    
    ai_suggested --> source_attached : Primary Reference Linked
    contributor_provided --> source_attached : Archive Evidence Found
    
    contributor_provided --> community_confirmed : Guild/Elder Attestation
    source_attached --> curator_reviewed : Curator Inspection Passed
    community_confirmed --> curator_reviewed : Official Verification
    
    source_attached --> disputed : Contradictory Evidence
    curator_reviewed --> disputed : Field Audit Challenge
    disputed --> restricted : Culturally Sensitive / Harmful
```

### Claim Status Definitions:
- `ai_suggested`: Raw machine-generated observation; draft only.
- `contributor_provided`: Direct statement from artisan oral history.
- `source_attached`: Direct citation to published museum catalog, GI registry, or scholarly monograph.
- `community_confirmed`: Attested by local artisan collective, guild, or recognized master craftsperson.
- `curator_reviewed`: Verified and signed off by an authorized heritage reviewer.
- `disputed`: Conflicting regional traditions or disputed historical assertion; requires investigation.
- `restricted`: Cultural or ceremonial knowledge restricted from general public display.

---

## 3. Record Lifecycle

1. **Capture:** Contributor records audio or uploads photo in Artisan Studio.
2. **AI Draft:** Gemini prepares preliminary transcription and structures fields; explicitly flagged as `is_draft: true`.
3. **Contributor Editing:** Contributor corrects terms, sets consent scope, and chooses attribution (`named`, `collective`, `anonymous`).
4. **Curator Review:** Curator inspects sources, adjusts claim statuses, and approves/rejects publication.
5. **Preservation:** Approved public records are stored in PostgreSQL and vector-indexed for Heritage Q&A.
6. **Discovery & Opportunity:** Public visitors explore the craft and connect with the maker; artisans leverage approved records to create product story cards.
