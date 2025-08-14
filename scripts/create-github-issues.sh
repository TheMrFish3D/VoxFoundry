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

# Check if authenticated
if ! gh auth status &> /dev/null; then
    print_error "Not authenticated with GitHub CLI. Run 'gh auth login' first."
    exit 1
fi

# Function to create issue
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
    echo "Usage: $0 [OPTIONS] [CHUNK]"
    echo ""
    echo "Options:"
    echo "  --dry-run          Show what would be created without creating"
    echo "  --help             Show this help message"
    echo ""
    echo "Chunks:"
    echo "  chunk1             Create Foundation & Infrastructure issues"
    echo "  validation         Create validation checkpoint issues"
    echo "  all                Create all issues (default)"
    echo ""
    echo "Examples:"
    echo "  $0 chunk1          # Create foundation issues only"
    echo "  $0 validation      # Create validation issues only"
    echo "  $0 --dry-run all   # Show all issues that would be created"
}

# Parse command line arguments
CHUNK="all"
if [[ $# -gt 0 ]]; then
    if [[ "$1" == "--help" ]]; then
        show_usage
        exit 0
    elif [[ "$1" == "--dry-run" && $# -gt 1 ]]; then
        CHUNK="$2"
    elif [[ "$1" != "--dry-run" ]]; then
        CHUNK="$1"
    fi
fi

# Create issues based on chunk selection
case $CHUNK in
    "chunk1")
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
        print_error "Unknown chunk: $CHUNK"
        show_usage
        exit 1
        ;;
esac

if [[ "$DRY_RUN" == "false" ]]; then
    print_success "Issue creation completed!"
    print_status "Next steps:"
    echo "1. Review created issues in GitHub"
    echo "2. Assign issues to appropriate agents"
    echo "3. Start with Foundation issues first"
    echo "4. Create validation checkpoints after each chunk"
else
    print_status "Dry run completed. Use without --dry-run to create issues."
fi