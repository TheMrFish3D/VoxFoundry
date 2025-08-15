# VoxFoundry - AI-Powered Audiobook Production

VoxFoundry is a web application for using AI to analyze ePub files, create detailed acting notes, and produce multi-actor audiobooks using voice synthesizers.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Current Project State

**IMPORTANT**: This project is in planned development stage. The repository contains comprehensive planning documentation and is ready for development to begin.

### Project Status
- ✅ **Architecture Planned**: Complete system design in ARCHITECTURE.md
- ✅ **Development Plan**: 23 detailed issues across 10 epics in DEVELOPMENT_ISSUES.md  
- ✅ **Issue Templates**: GitHub issue templates created for development chunks
- ✅ **Development Environment**: Docker-based setup planned and documented
- 🚧 **Ready for Development**: Foundation issues (#1-#3, #6) should be created first
- ⏸️ **No Source Code Yet**: Implementation begins with Issue #1 (Monorepo Setup)

### Current Development Phase
**Phase**: Issue Creation and Team Assembly
**Next Steps**: 
1. Create GitHub issues from templates (use scripts/create-github-issues.sh)
2. Begin with Foundation & Infrastructure chunk (Issues #1, #2, #3, #6)
3. Set up validation checkpoints after each development chunk

## Project Overview

VoxFoundry aims to be a comprehensive web application that:
- Analyzes ePub files using AI
- Generates detailed acting notes and character analysis
- Uses voice synthesizers to create multi-actor audiobook productions
- Provides a web interface for managing the entire workflow

## Repository Structure

Current repository contents:
```
/home/runner/work/VoxFoundry/VoxFoundry/
├── .git/                           # Git repository data
├── .github/                        # GitHub configuration and workflows
│   └── copilot-instructions.md     # This file
├── packages/                       # Monorepo structure (planned, not yet implemented)
├── scripts/                        # Development and automation scripts
│   ├── create-issues.js           # Node.js issue creation script
│   └── create-github-issues.sh    # Bash script for GitHub CLI issue creation
├── github-issues/                  # Issue templates for GitHub creation
├── ARCHITECTURE.md                 # Complete system architecture documentation
├── DEVELOPMENT.md                  # Development setup and coding standards
├── DEVELOPMENT_ISSUES.md          # 23 detailed development issues across 10 epics
├── PROJECT_PLAN.md                # Comprehensive development roadmap
├── PLAN_VALIDATION.md             # Plan validation and readiness assessment
├── GITHUB_ISSUES_GUIDE.md         # Guide for creating and managing GitHub issues
├── README.md                      # Project overview and documentation index
├── package.json                   # Root package.json with workspace configuration
├── turbo.json                     # Turborepo configuration
├── docker-compose.dev.yml         # Development environment Docker setup
├── .env.example                   # Environment variables template
└── .gitignore                     # Git ignore patterns
```

## Development Workflow

### Issue-Based Development Process

This project uses a structured issue-based development process with validation checkpoints:

#### Phase 1: Foundation & Infrastructure (Issues #1-3, #6)
**Priority**: Critical - Must be completed first
**Estimated Time**: 1-2 weeks
**Agent Types**: DevOps, Database, Backend

**Issues**:
- **#1**: Initialize Monorepo Structure (2 days)
- **#2**: Development Environment Setup (1 day) 
- **#3**: Database Schema Implementation (2 days)
- **#6**: CI/CD Pipeline Setup (2 days)

**Validation**: Project Setup Validation Checkpoint (V1)

#### Phase 2: Authentication & Core Services (Issues #4, #7, #8)
**Priority**: High - Security foundation
**Estimated Time**: 1 week
**Agent Types**: Backend, Security, API

#### Phase 3: EPUB Processing & AI Integration (Issues #5, #9-11)
**Priority**: High - Core functionality
**Estimated Time**: 2-3 weeks  
**Agent Types**: Backend, AI/ML, NLP

#### Phase 4: Voice Management & Synthesis (Issues #12-17)
**Priority**: Medium - Voice capabilities
**Estimated Time**: 3-4 weeks
**Agent Types**: Audio, AI/ML, Backend

#### Phase 5: Frontend Applications (Issues #18-20)
**Priority**: Medium - User interfaces
**Estimated Time**: 2-3 weeks
**Agent Types**: Frontend, UI/UX

#### Phase 6: Testing & Quality Assurance (Issues #21-23)
**Priority**: Medium - Quality validation
**Estimated Time**: 2 weeks
**Agent Types**: QA, Security, Testing

### Creating GitHub Issues

Use the provided scripts to create issues in chunks:

```bash
# Create foundation issues (start here)
./scripts/create-github-issues.sh chunk1

# Create validation checkpoints
./scripts/create-github-issues.sh validation

# View what would be created (dry run)
./scripts/create-github-issues.sh --dry-run all
```

### Validation Checkpoints

After each development phase, create and complete validation checkpoint issues:
- **V1**: After Foundation (Issues #1-3, #6)
- **V2**: After Authentication & Core Services
- **V3**: After EPUB & AI Integration  
- **V4**: After Voice Management & Synthesis
- **V5**: After Frontend Applications
- **V6**: Final Quality Validation

Each checkpoint validates:
- Technical implementation quality
- Integration between components
- Architecture decisions
- Copilot instruction updates
- Documentation completeness
- Readiness for next phase

### Initial Setup (Ready for Development)

The project has comprehensive planning and is ready for development to begin:

**Confirmed Technology Stack**:
- **Frontend**: React 18+ with Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js 20+ with Express, tRPC for type-safe APIs
- **Database**: PostgreSQL 15+ with Redis caching, MinIO for file storage
- **AI Integration**: OpenAI, Anthropic, Google AI for LLM processing
- **Voice Synthesis**: ElevenLabs, Azure Speech, Google TTS
- **Infrastructure**: Docker, Kubernetes, GitHub Actions, Turborepo monorepo

**Development Setup Process**:
```bash
# 1. First, create GitHub issues (Project Manager/Setup Agent)
cd /home/runner/work/VoxFoundry/VoxFoundry
./scripts/create-github-issues.sh chunk1  # Create foundation issues

# 2. Begin with Issue #1: Initialize Monorepo Structure (DevOps Agent)
# This will create the full package structure and build system

# 3. Once monorepo is set up (after Issue #1), typical workflow will be:
npm install                    # Install all dependencies
npm run build                 # Build all packages
npm run test                  # Run test suites  
npm run dev                   # Start development server
npm run docker:dev            # Start development services

# 4. Development environment (after Issue #2)
docker-compose -f docker-compose.dev.yml up  # Start all services
```

# Python based project (if applicable)  
pip install -r requirements.txt
python -m pytest  # Run tests
python app.py      # Start application
```

### Current Validation Steps

**Repository Status Check**:
```bash
cd /home/runner/work/VoxFoundry/VoxFoundry
ls -la                    # Should show: .git/, .github/, README.md
git status               # Check current branch and changes
cat README.md            # View project description
```

**Expected Output**:
- README.md contains: "Web app for using AI to Analyse epubs, make detailed acting notes and then using voice synthesisers to have it acted out as a multi-actor book"
- No build files or source code present yet

## Build and Test Instructions

**CRITICAL: No build system exists yet**. When development begins:

- **DO NOT** attempt to run build commands until project files (package.json, requirements.txt, etc.) are present
- **DO NOT** attempt to run tests until test framework is implemented
- **ALWAYS** validate that required files exist before running commands

### Future Build Expectations

When the project is implemented, expect:
- **Build time**: Unknown - NEVER CANCEL builds, set timeout to 60+ minutes minimum
- **Test time**: Unknown - NEVER CANCEL tests, set timeout to 30+ minutes minimum
- **Installation time**: Unknown - NEVER CANCEL dependency installation

## Validation and Testing

### Current Validation (Ready for Development)
```bash
# Verify repository structure and planning
ls -la /home/runner/work/VoxFoundry/VoxFoundry
# Should show: comprehensive documentation, scripts, issue templates

# Verify planning documentation exists
cat /home/runner/work/VoxFoundry/VoxFoundry/DEVELOPMENT_ISSUES.md | head -20
cat /home/runner/work/VoxFoundry/VoxFoundry/ARCHITECTURE.md | head -20

# Test issue creation scripts
./scripts/create-github-issues.sh --dry-run chunk1
# Should show: 4 foundation issues ready for creation

# Verify GitHub CLI authentication (for issue creation)
gh auth status
# Should show: authenticated status
```

### Development Readiness Checklist
- [x] **Architecture Documentation**: Complete system design available
- [x] **Development Issues**: 23 detailed issues defined and ready
- [x] **Issue Templates**: GitHub-ready templates created
- [x] **Development Scripts**: Automation tools ready
- [x] **Technology Stack**: Confirmed and documented
- [x] **Development Environment**: Docker setup planned
- [x] **Build System**: Turborepo configuration ready
- [x] **CI/CD Planning**: GitHub Actions workflows planned
- [ ] **GitHub Issues Created**: Ready for creation (use scripts)
- [ ] **Team Assignment**: Agents need to be assigned to issues  
- [ ] **Development Started**: Begin with Issue #1

### Future Validation (When Code Exists)
- **ALWAYS** run the complete end-to-end scenario after making changes
- **MANUAL TESTING REQUIRED**: Test actual functionality, not just starting/stopping
- Expected scenarios to test:
  - Upload an ePub file
  - Run AI analysis on the content
  - Generate character acting notes
  - Produce voice synthesis output
  - Download final audiobook

## Common Tasks

### Repository Navigation
```bash
# Repository root
cd /home/runner/work/VoxFoundry/VoxFoundry

# Current directory contents
ls -la
# Expected output:
# .git/
# .github/
# README.md
```

### Documentation Review
```bash
# View main project description
cat README.md
# Expected: "Web app for using AI to Analyse epubs, make detailed acting notes and then using voice synthesisers to have it acted out as a multi-actor book"

# View these instructions
cat .github/copilot-instructions.md
```

### Development Workflow (Future)

When development begins, expect this workflow:
1. **ALWAYS** run initial setup commands first
2. **NEVER CANCEL** any build or test commands - they may take 45+ minutes
3. **ALWAYS** set timeouts of 60+ minutes for builds, 30+ minutes for tests
4. **MANUAL VALIDATION**: Test actual user scenarios, not just command success
5. **ALWAYS** run linting and formatting before committing (when tools are available)

## Key Areas (Future Development)

Expected important directories when development begins:
- `/src/` or `/app/` - Main application source code
- `/tests/` - Test suites
- `/docs/` - Additional documentation
- `/ai/` or `/ml/` - AI/ML model code and configuration
- `/audio/` - Audio processing and synthesis code
- `/uploads/` - ePub file handling
- `/public/` or `/static/` - Web assets

## CI/CD Expectations

**No GitHub Actions workflows exist yet**. When implemented, expect:
- Automated builds on pull requests
- Automated testing
- Code quality checks (linting, formatting)
- Security scanning for dependencies

## Development Guidelines

### When Adding New Features
- **ALWAYS** validate your changes with real user scenarios
- **NEVER** assume commands work without testing them
- **ALWAYS** document expected build/test times with "NEVER CANCEL" warnings
- **MANUAL TESTING**: Exercise the actual functionality, not just technical success

### Code Quality (Future)
When linting/formatting tools are added:
- **ALWAYS** run formatting before committing
- **ALWAYS** run linting before committing
- Expected commands (when available):
  ```bash
  npm run format    # or equivalent formatter
  npm run lint      # or equivalent linter
  ```

## Troubleshooting

### Current Issues
- **No build system**: Expected - project is in early development
- **No source code**: Expected - project is in early development
- **No tests**: Expected - project is in early development

### When Development Begins
- If builds fail, check for missing dependencies or system requirements
- If tests fail, verify test data and environment setup
- For AI/ML components, verify model files and API keys are properly configured
- For audio synthesis, verify audio libraries and codecs are installed

## Important Notes

- **TIMEOUT SETTINGS**: Always use 60+ minute timeouts for builds, 30+ minutes for tests
- **NEVER CANCEL**: Wait for all commands to complete, even if they take 45+ minutes
- **MANUAL VALIDATION**: Always test real user workflows after changes
- **EARLY STAGE**: This project currently has no implementation - expect to build everything from scratch
- **AI FOCUS**: This project involves AI text analysis and voice synthesis - expect longer processing times

Remember: These instructions reflect the current early-stage state. Update them as the project develops and actual build/test/run procedures are implemented.