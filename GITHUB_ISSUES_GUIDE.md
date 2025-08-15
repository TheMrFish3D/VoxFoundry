# GitHub Issue Creation Guide for VoxFoundry

This document provides templates and guidance for creating GitHub issues from the VoxFoundry development plan.

## 🏷️ GitHub Issues Setup

### Step 1: Create Required Labels (REQUIRED FIRST)

Before creating any issues, you must create the required labels:

```bash
# Create all required labels
./scripts/create-github-issues.sh labels

# Preview what labels would be created (dry-run)
./scripts/create-github-issues.sh --dry-run labels
```

**Required Labels (27 total):**
- **Epic labels (8)**: epic:foundation, epic:authentication, epic:epub-processing, epic:ai-integration, epic:voice-management, epic:voice-synthesis, epic:frontend, epic:testing
- **Priority labels (4)**: priority:critical, priority:high, priority:medium, priority:low  
- **Effort labels (5)**: effort:1-day, effort:2-days, effort:3-days, effort:4-days, effort:5-days
- **Chunk labels (6)**: chunk:foundation-infrastructure, chunk:authentication-core, chunk:epub-ai-integration, chunk:voice-management, chunk:frontend-applications, chunk:testing-quality
- **Special labels (4)**: validation, checkpoint, agent-ready, blocked

### Step 2: Create Issues

After labels are created, create issues in organized chunks:

```bash
# Create foundation issues (start here)
./scripts/create-github-issues.sh chunk1

# Create validation checkpoints  
./scripts/create-github-issues.sh validation

# Preview all issues (dry-run)
./scripts/create-github-issues.sh --dry-run all
```

## 📋 Issue Creation Process

### Phase 1: Foundation & Infrastructure (Issues #1-3, #6)
Create these issues first as they are critical dependencies:

**Priority Order:**
1. Issue #1: Initialize Monorepo Structure
2. Issue #2: Development Environment Setup  
3. Issue #3: Database Schema Implementation
4. Issue #6: CI/CD Pipeline Setup

### Phase 2: Authentication & Core Services (Issues #4, #7, #8)
Create after Foundation is complete:

**Priority Order:**
1. Issue #4: User Authentication System
2. Issue #7: API Gateway and Rate Limiting
3. Issue #8: File Storage Service

### Phase 3: EPUB Processing & AI Integration (Issues #5, #9-11)
Core functionality development:

**Priority Order:**
1. Issue #5: EPUB Parser Implementation
2. Issue #9: Character and Dialogue Detection
3. Issue #10: Multi-Provider LLM Client
4. Issue #11: Acting Notes Generation

### Phase 4: Voice Management & Synthesis (Issues #12-17)
Voice system development:

**Priority Order:**
1. Issue #12: Voice Profile Database
2. Issue #13: Voice Sample Analysis
3. Issue #14: Actor Search System
4. Issue #15: Automated Profile Generation
5. Issue #16: Multi-Provider TTS Integration
6. Issue #17: Audio Processing Pipeline

### Phase 5: Frontend Applications (Issues #18-20)
User interface development:

**Priority Order:**
1. Issue #18: Main VoxForge App UI
2. Issue #19: Voice Library Management UI
3. Issue #20: Voice Profile Creator UI

### Phase 6: Testing & Quality Assurance (Issues #21-23)
Comprehensive testing:

**Priority Order:**
1. Issue #21: Unit Test Suite
2. Issue #22: Integration Test Suite
3. Issue #23: Security Testing and Audit

## 🔍 Validation Checkpoints

Create these validation issues after each phase:

1. **V1: Project Setup Validation** (after Phase 1)
2. **V2: Core Services Validation** (after Phase 2)
3. **V3: AI Integration Validation** (after Phase 3)
4. **V4: Voice System Validation** (after Phase 4)
5. **V5: Frontend Integration Validation** (after Phase 5)
6. **V6: Final Quality Validation** (after Phase 6)

## 🤖 Issue Creation Commands

Use GitHub CLI to create issues:

```bash
# For development issues
gh issue create \
  --title "Issue #1: Initialize Monorepo Structure" \
  --body-file github-issues/01-issue--1--initialize-monorepo-structure.md \
  --label "epic:foundation,priority:critical,chunk:foundation-infrastructure"

# For validation issues
gh issue create \
  --title "Project Setup Validation Checkpoint" \
  --body-file github-issues/01-project-setup-validation-checkpoint.md \
  --label "validation,checkpoint,priority:high"
```

## 📊 Issue Labels

Use these labels for organization:

**Epic Labels:**
- `epic:foundation`
- `epic:authentication`
- `epic:epub-processing`
- `epic:ai-integration`
- `epic:voice-management`
- `epic:voice-synthesis`
- `epic:frontend`
- `epic:testing`

**Priority Labels:**
- `priority:critical`
- `priority:high`
- `priority:medium`
- `priority:low`

**Effort Labels:**
- `effort:1-day`
- `effort:2-days`
- `effort:3-days`
- `effort:4-days`
- `effort:5-days`

**Chunk Labels:**
- `chunk:foundation-infrastructure`
- `chunk:authentication-core-services`
- `chunk:epub-ai-integration`
- `chunk:voice-management-synthesis`
- `chunk:frontend-applications`
- `chunk:testing-quality-assurance`

**Special Labels:**
- `validation`
- `checkpoint`
- `agent-ready`
- `blocked`

## 🎯 Agent Assignment Guidelines

**DevOps/Setup Agent:**
- Issues #1, #2, #3, #6 (Foundation)
- Validation checkpoints

**Backend/API Agent:**
- Issues #4, #7, #8 (Auth & Services)
- Issues #5, #9 (EPUB Processing)

**AI/ML Agent:**
- Issues #10, #11 (LLM Integration)
- Issues #13, #15 (Voice Analysis)

**Audio/Voice Agent:**
- Issues #14, #16, #17 (Voice & Audio)
- Issue #12 (Voice Database)

**Frontend Agent:**
- Issues #18, #19, #20 (UI Development)

**QA/Testing Agent:**
- Issues #21, #22, #23 (Testing)
- All validation checkpoints

## 📝 Next Steps

1. **Create Foundation Issues** (#1-3, #6) immediately
2. **Assign to DevOps agents** for rapid setup
3. **Create Validation Checkpoint V1** after foundation
4. **Proceed phase by phase** with validation between each
5. **Update Copilot instructions** based on validation findings
6. **Monitor progress** and adjust scope as needed

## 🔗 Dependencies

Each issue lists its dependencies. Ensure prerequisite issues are completed before starting dependent work:

- **#2** depends on **#1**
- **#4** depends on **#3**
- **#7** depends on **#4**
- **#8** depends on **#3**
- **#9** depends on **#5**
- **#10** depends on **#7**
- **#11** depends on **#10**
- And so on...

Refer to DEVELOPMENT_ISSUES.md for complete dependency mapping.