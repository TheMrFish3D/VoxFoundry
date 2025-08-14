# VoxFoundry - AI-Powered Audiobook Production

VoxFoundry is a web application for using AI to analyze ePub files, create detailed acting notes, and produce multi-actor audiobooks using voice synthesizers.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Current Project State

**IMPORTANT**: This project is in early development stage. There is currently no source code, build system, or dependencies implemented yet. The repository contains only basic documentation.

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
├── .git/                    # Git repository data
├── .github/                 # GitHub configuration and workflows
│   └── copilot-instructions.md  # This file
└── README.md               # Basic project description (157 bytes)
```

## Working Effectively

### Initial Setup (When Development Begins)

Since this is an early-stage project, expect to set up the initial development environment:

**Expected Technology Stack** (based on project description):
- **Frontend**: Likely React, Vue.js, or similar web framework
- **Backend**: Node.js/Express, Python/Flask/FastAPI, or similar for AI processing
- **AI/ML**: Python libraries for text analysis and voice synthesis
- **Database**: PostgreSQL, MongoDB, or similar for storing analysis and audio data
- **Audio Processing**: Libraries for audio file handling and synthesis

**When code is added, typical setup will likely be**:
```bash
# Node.js based project (if applicable)
npm install
npm run build      # Expected build time: TBD - NEVER CANCEL, set timeout 60+ minutes
npm run test       # Expected test time: TBD - NEVER CANCEL, set timeout 30+ minutes
npm run dev        # Start development server

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

### Current Validation (Early Stage)
```bash
# Verify repository structure
ls -la /home/runner/work/VoxFoundry/VoxFoundry
# Should show: .git/, .github/, README.md

# Verify this instructions file exists
cat /home/runner/work/VoxFoundry/VoxFoundry/.github/copilot-instructions.md
```

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