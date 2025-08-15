#!/bin/bash

# VoxFoundry GitHub Issues Creation Script
# Creates issues from the development plan in organized chunks

set -e

# Configuration
REPO="TheMrFish3D/VoxFoundry"
ISSUES_DIR="github-issues"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    print_error "GitHub CLI (gh) is not installed. Please install it first:"
    print_error "https://cli.github.com/"
    exit 1
fi

# Check if authenticated (skip for dry-run mode)
check_auth() {
    if ! gh auth status &> /dev/null; then
        print_error "Not authenticated with GitHub CLI. Run 'gh auth login' first."
        exit 1
    fi
}

# Function to create or update a label
create_label() {
    local name="$1"
    local color="$2"
    local description="$3"
    
    print_status "Creating label: $name"
    
    # Check if label exists
    if gh label list --repo "$REPO" --limit 1000 | grep -q "^$name"; then
        print_warning "Label '$name' already exists, skipping"
        return 0
    fi
    
    if gh label create \
        --repo "$REPO" \
        --name "$name" \
        --color "$color" \
        --description "$description"; then
        print_success "Created label: $name"
        return 0
    else
        print_error "Failed to create label: $name"
        return 1
    fi
}

# Function to create all required labels
create_all_labels() {
    print_status "Creating Required GitHub Labels"
    print_status "==============================="
    
    # Epic labels (8)
    create_label "epic:foundation" "1d76db" "Foundation and infrastructure development"
    create_label "epic:authentication" "0366d6" "User authentication and security"
    create_label "epic:epub-processing" "0052cc" "EPUB file processing and analysis"
    create_label "epic:ai-integration" "5319e7" "AI and LLM integration features"
    create_label "epic:voice-management" "f9d0c4" "Voice profile and actor management"
    create_label "epic:voice-synthesis" "d4c5f9" "Text-to-speech and audio generation"
    create_label "epic:frontend" "fbca04" "User interface and frontend applications"
    create_label "epic:testing" "0e8a16" "Testing, validation, and quality assurance"
    
    # Priority labels (4)
    create_label "priority:critical" "d73a4a" "Critical priority - blocks other work"
    create_label "priority:high" "orange" "High priority - important for milestone"
    create_label "priority:medium" "yellow" "Medium priority - normal timeline"
    create_label "priority:low" "green" "Low priority - when time allows"
    
    # Effort labels (5)  
    create_label "effort:1-day" "c2e0c6" "Estimated 1 day of work"
    create_label "effort:2-days" "7cc7a6" "Estimated 2 days of work"
    create_label "effort:3-days" "4f9a6e" "Estimated 3 days of work"
    create_label "effort:4-days" "2e7344" "Estimated 4 days of work"
    create_label "effort:5-days" "1a472a" "Estimated 5 days of work"
    
    # Chunk labels (6)
    create_label "chunk:foundation-infrastructure" "e1f5fe" "Foundation and Infrastructure chunk"
    create_label "chunk:authentication-core" "b3e5fc" "Authentication and Core Services chunk"
    create_label "chunk:epub-ai-integration" "81d4fa" "EPUB Processing and AI Integration chunk"
    create_label "chunk:voice-management" "651fff" "Voice Management and Synthesis chunk"
    create_label "chunk:frontend-applications" "3f51b5" "Frontend Applications chunk"
    create_label "chunk:testing-quality" "1a237e" "Testing and Quality Assurance chunk"
    
    # Special labels (4)
    create_label "validation" "ff6b6b" "Validation checkpoint issue"
    create_label "checkpoint" "4ecdc4" "Development milestone checkpoint"
    create_label "agent-ready" "45b7d1" "Ready for AI agent assignment"
    create_label "blocked" "96ceb4" "Blocked by dependencies or external factors"
    
    print_success "Label creation completed!"
    echo ""
}
create_issue() {
    local title="$1"
    local body_file="$2"
    local labels="$3"
    
    print_status "Creating issue: $title"
    
    if [ ! -f "$body_file" ]; then
        print_error "Body file not found: $body_file"
        return 1
    fi
    
    if gh issue create \
        --repo "$REPO" \
        --title "$title" \
        --body-file "$body_file" \
        --label "$labels"; then
        print_success "Created: $title"
        return 0
    else
        print_error "Failed to create: $title"
        return 1
    fi
}

# Function to create chunk issues
create_chunk() {
    local chunk_name="$1"
    shift
    local issues=("$@")
    
    print_status "Creating Chunk: $chunk_name"
    echo "=================================="
    
    for issue_info in "${issues[@]}"; do
        IFS='|' read -r number title labels body_file <<< "$issue_info"
        create_issue "$title" "$ISSUES_DIR/$body_file" "$labels"
        sleep 2  # Rate limiting
    done
    
    echo ""
}

# Define issues by chunk
print_status "VoxFoundry GitHub Issues Creation"
print_status "================================="

# Check if running in dry-run mode
DRY_RUN=false
if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN=true
    print_warning "DRY RUN MODE - Issues will not be created"
fi

# Chunk 1: Foundation & Infrastructure
CHUNK1_ISSUES=(
    "1|Issue #1: Initialize Monorepo Structure|epic:foundation,priority:critical,effort:2-days,chunk:foundation-infrastructure|01-initialize-monorepo-structure.md"
    "2|Issue #2: Development Environment Setup|epic:foundation,priority:critical,effort:1-day,chunk:foundation-infrastructure|02-development-environment-setup.md"
    "3|Issue #3: Database Schema Implementation|epic:foundation,priority:critical,effort:2-days,chunk:foundation-infrastructure|03-database-schema-implementation.md"
    "6|Issue #6: CI/CD Pipeline Setup|epic:foundation,priority:high,effort:2-days,chunk:foundation-infrastructure|06-ci-cd-pipeline-setup.md"
)

# Validation Issues
VALIDATION_ISSUES=(
    "V1|Project Setup Validation Checkpoint|validation,checkpoint,priority:high|V1-project-setup-validation-checkpoint.md"
    "V2|Core Services Validation Checkpoint|validation,checkpoint,priority:high|V2-core-services-validation-checkpoint.md"
    "V3|AI Integration Validation Checkpoint|validation,checkpoint,priority:high|V3-ai-integration-validation-checkpoint.md"
    "V4|Voice System Validation Checkpoint|validation,checkpoint,priority:high|V4-voice-system-validation-checkpoint.md"
    "V5|Frontend Integration Validation Checkpoint|validation,checkpoint,priority:high|V5-frontend-integration-validation-checkpoint.md"
    "V6|Final Quality Validation Checkpoint|validation,checkpoint,priority:high|V6-final-quality-validation-checkpoint.md"
)

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS] [COMMAND]"
    echo ""
    echo "Options:"
    echo "  --dry-run          Show what would be created without creating"
    echo "  --help             Show this help message"
    echo ""
    echo "Commands:"
    echo "  labels             Create all required GitHub labels"
    echo "  chunk1             Create Foundation & Infrastructure issues"
    echo "  validation         Create validation checkpoint issues"
    echo "  all                Create all issues (default)"
    echo ""
    echo "Setup Workflow:"
    echo "  1. $0 labels       # Create labels first (REQUIRED)"
    echo "  2. $0 chunk1       # Create foundation issues"
    echo "  3. $0 validation   # Create validation checkpoints"
    echo ""
    echo "Examples:"
    echo "  $0 labels           # Create all required labels"
    echo "  $0 chunk1           # Create foundation issues only"
    echo "  $0 validation       # Create validation issues only"
    echo "  $0 --dry-run labels # Show labels that would be created"
    echo "  $0 --dry-run all    # Show all issues that would be created"
}

# Parse command line arguments
COMMAND="all"
if [[ $# -gt 0 ]]; then
    if [[ "$1" == "--help" ]]; then
        show_usage
        exit 0
    elif [[ "$1" == "--dry-run" && $# -gt 1 ]]; then
        COMMAND="$2"
    elif [[ "$1" != "--dry-run" ]]; then
        COMMAND="$1"
    fi
fi

# Create issues based on command selection
case $COMMAND in
    "labels")
        # Check authentication for non-dry-run
        if [[ "$DRY_RUN" == "false" ]]; then
            check_auth
        fi
        
        if [[ "$DRY_RUN" == "true" ]]; then
            print_status "Would create the following labels:"
            echo "Epic labels (8): epic:foundation, epic:authentication, epic:epub-processing, epic:ai-integration, epic:voice-management, epic:voice-synthesis, epic:frontend, epic:testing"
            echo "Priority labels (4): priority:critical, priority:high, priority:medium, priority:low"
            echo "Effort labels (5): effort:1-day, effort:2-days, effort:3-days, effort:4-days, effort:5-days"
            echo "Chunk labels (6): chunk:foundation-infrastructure, chunk:authentication-core, chunk:epub-ai-integration, chunk:voice-management, chunk:frontend-applications, chunk:testing-quality"
            echo "Special labels (4): validation, checkpoint, agent-ready, blocked"
            echo ""
            echo "Total: 27 labels would be created"
        else
            create_all_labels
        fi
        ;;
    "chunk1")
        # Check authentication for non-dry-run
        if [[ "$DRY_RUN" == "false" ]]; then
            check_auth
        fi
        
        if [[ "$DRY_RUN" == "true" ]]; then
            print_status "Would create Foundation & Infrastructure issues:"
            for issue_info in "${CHUNK1_ISSUES[@]}"; do
                IFS='|' read -r number title labels body_file <<< "$issue_info"
                echo "  - $title"
            done
        else
            create_chunk "Foundation & Infrastructure" "${CHUNK1_ISSUES[@]}"
        fi
        ;;
    "validation")
        # Check authentication for non-dry-run
        if [[ "$DRY_RUN" == "false" ]]; then
            check_auth
        fi
        
        if [[ "$DRY_RUN" == "true" ]]; then
            print_status "Would create validation checkpoint issues:"
            for issue_info in "${VALIDATION_ISSUES[@]}"; do
                IFS='|' read -r number title labels body_file <<< "$issue_info"
                echo "  - $title"
            done
        else
            create_chunk "Validation Checkpoints" "${VALIDATION_ISSUES[@]}"
        fi
        ;;
    "all")
        # Check authentication for non-dry-run
        if [[ "$DRY_RUN" == "false" ]]; then
            check_auth
        fi
        
        if [[ "$DRY_RUN" == "true" ]]; then
            print_status "Would create all issues:"
            echo "Foundation & Infrastructure:"
            for issue_info in "${CHUNK1_ISSUES[@]}"; do
                IFS='|' read -r number title labels body_file <<< "$issue_info"
                echo "  - $title"
            done
            echo "Validation Checkpoints:"
            for issue_info in "${VALIDATION_ISSUES[@]}"; do
                IFS='|' read -r number title labels body_file <<< "$issue_info"
                echo "  - $title"
            done
        else
            create_chunk "Foundation & Infrastructure" "${CHUNK1_ISSUES[@]}"
            sleep 5  # Pause between chunks
            create_chunk "Validation Checkpoints" "${VALIDATION_ISSUES[@]}"
        fi
        ;;
    *)
        print_error "Unknown command: $COMMAND"
        show_usage
        exit 1
        ;;
esac

if [[ "$DRY_RUN" == "false" ]]; then
    if [[ "$COMMAND" == "labels" ]]; then
        print_success "Label creation completed!"
        print_status "Next steps:"
        echo "1. Run: $0 chunk1 (to create foundation issues)"
        echo "2. Review created issues in GitHub"
        echo "3. Assign issues to appropriate agents"
        echo "4. Start with Foundation issues first"
    else
        print_success "Issue creation completed!"
        print_status "Next steps:"
        echo "1. Review created issues in GitHub"
        echo "2. Assign issues to appropriate agents"
        echo "3. Start with Foundation issues first"
        echo "4. Create validation checkpoints after each chunk"
    fi
else
    if [[ "$COMMAND" == "labels" ]]; then
        print_status "Dry run completed. Use 'gh auth login' first, then run without --dry-run to create labels."
    else
        print_status "Dry run completed. Create labels first, then use without --dry-run to create issues."
    fi
fi