# VoxFoundry Architecture Documentation

## Project Overview

VoxFoundry is a comprehensive web application ecosystem for creating AI-powered multi-actor audiobooks. The system processes EPUB files, generates detailed acting notes using Large Language Models (LLMs), and synthesizes realistic multi-voice audio content.

## System Architecture

### High-Level Components

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   VoxForge      │    │ Voice Library   │    │ Voice Profile   │
│   Main App      │    │   Manager       │    │   Creator       │
│                 │    │                 │    │                 │
│ • EPUB Analysis │    │ • Voice Storage │    │ • Sample Search │
│ • LLM Processing│    │ • Profile Mgmt  │    │ • Profile Gen   │
│ • Voice Synth   │    │ • Quality Ctrl  │    │ • Validation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Shared Core   │
                    │                 │
                    │ • API Gateway   │
                    │ • Authentication│
                    │ • Database      │
                    │ • File Storage  │
                    │ • AI Integrations│
                    └─────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18+ with Next.js 14
- **UI Library**: Material-UI (MUI) or Tailwind CSS
- **State Management**: Redux Toolkit or Zustand
- **File Upload**: React Dropzone
- **Audio Player**: React Audio Player

### Backend
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js with tRPC for type-safe APIs
- **Authentication**: JWT with refresh tokens
- **File Processing**: 
  - EPUB: `epub2` or `epub-parser`
  - Audio: `ffmpeg` via `fluent-ffmpeg`

### Database
- **Primary**: PostgreSQL 15+ for structured data
- **Cache**: Redis for session management and caching
- **File Storage**: AWS S3 or MinIO for object storage

### AI & Voice Services
- **LLM Providers**:
  - OpenAI GPT-4/GPT-4-turbo
  - Anthropic Claude
  - Google PaLM/Gemini
  - Azure OpenAI
- **Voice Synthesis**:
  - ElevenLabs
  - Azure Speech Services
  - Google Text-to-Speech
  - Amazon Polly

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes (production)
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: Winston + ELK Stack

## Detailed Component Architecture

### 1. VoxForge Main Application

**Purpose**: Core application for EPUB processing and audiobook generation

**Key Features**:
- EPUB file upload and parsing
- Character and dialogue extraction
- LLM-powered acting note generation
- Voice assignment and synthesis orchestration
- Audio timeline generation
- Export capabilities

**API Endpoints**:
```
POST /api/books/upload          # Upload EPUB file
GET  /api/books/:id             # Get book details
POST /api/books/:id/analyze     # Start LLM analysis
GET  /api/books/:id/analysis    # Get analysis results
POST /api/books/:id/synthesize  # Generate audio
GET  /api/books/:id/audio       # Download generated audio
```

### 2. Voice Library Manager

**Purpose**: Centralized voice profile and library management

**Key Features**:
- Voice profile CRUD operations
- Voice sample management
- Quality assessment tools
- Voice categorization and tagging
- Bulk import/export capabilities

**API Endpoints**:
```
GET    /api/voices              # List all voices
POST   /api/voices              # Create new voice profile
GET    /api/voices/:id          # Get voice details
PUT    /api/voices/:id          # Update voice profile
DELETE /api/voices/:id          # Delete voice profile
POST   /api/voices/:id/samples  # Upload voice samples
```

### 3. Voice Profile Creator

**Purpose**: Automated voice profile generation from samples

**Key Features**:
- Actor name search and sample discovery
- Voice sample quality analysis
- Automated profile generation
- Manual review and adjustment tools
- Integration with external voice databases

**API Endpoints**:
```
POST /api/profiles/search       # Search for actor samples
POST /api/profiles/analyze      # Analyze voice samples
POST /api/profiles/generate     # Generate voice profile
GET  /api/profiles/:id/preview  # Preview generated profile
POST /api/profiles/:id/save     # Save to voice library
```

## Database Schema

### Core Tables

```sql
-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Books/EPUBs
CREATE TABLE books (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255),
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    upload_date TIMESTAMP DEFAULT NOW(),
    processing_status VARCHAR(50) DEFAULT 'uploaded',
    metadata JSONB
);

-- Voice Profiles
CREATE TABLE voice_profiles (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    gender VARCHAR(20),
    age_range VARCHAR(50),
    accent VARCHAR(100),
    voice_characteristics JSONB,
    sample_files TEXT[],
    quality_score DECIMAL(3,2),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Characters and Dialogue
CREATE TABLE characters (
    id UUID PRIMARY KEY,
    book_id UUID REFERENCES books(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_voice_id UUID REFERENCES voice_profiles(id),
    character_traits JSONB,
    dialogue_count INTEGER DEFAULT 0
);

-- Acting Notes
CREATE TABLE acting_notes (
    id UUID PRIMARY KEY,
    book_id UUID REFERENCES books(id),
    character_id UUID REFERENCES characters(id),
    chapter_number INTEGER,
    paragraph_index INTEGER,
    original_text TEXT NOT NULL,
    acting_direction TEXT,
    emotion VARCHAR(100),
    tone VARCHAR(100),
    emphasis_words TEXT[],
    llm_provider VARCHAR(50),
    confidence_score DECIMAL(3,2)
);
```

## Security Considerations

### Authentication & Authorization
- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- API rate limiting
- Input validation and sanitization

### Data Protection
- Encryption at rest for sensitive data
- TLS 1.3 for data in transit
- Secure file upload validation
- GDPR compliance for user data

### AI Integration Security
- API key management via environment variables
- Request/response logging for audit trails
- Content filtering for inappropriate material
- Usage monitoring and cost controls

## Performance Requirements

### Response Times
- File upload: < 30 seconds for 50MB EPUB
- LLM analysis: < 5 minutes per book chapter
- Voice synthesis: < 2 minutes per 1000 words
- Voice library search: < 500ms

### Scalability
- Support 1000+ concurrent users
- Handle 10GB+ of voice sample storage
- Process multiple books simultaneously
- Auto-scaling based on demand

## Development Guidelines

### Code Standards
- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- 100% test coverage for critical paths
- Comprehensive JSDoc documentation

### Testing Strategy
- Unit tests: Jest + React Testing Library
- Integration tests: Supertest for APIs
- E2E tests: Playwright
- Performance tests: Artillery

### CI/CD Pipeline
1. Code push triggers GitHub Actions
2. Lint, test, and build validation
3. Docker image creation
4. Automated deployment to staging
5. Manual approval for production deployment

## Deployment Architecture

### Development Environment
```yaml
# docker-compose.dev.yml
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    
  backend:
    build: ./backend
    ports: ["8000:8000"]
    
  postgres:
    image: postgres:15
    ports: ["5432:5432"]
    
  redis:
    image: redis:7
    ports: ["6379:6379"]
```

### Production Environment
- Kubernetes cluster with auto-scaling
- Load balancer with SSL termination
- Separate databases for each service
- CDN for static assets and audio files
- Monitoring and alerting system

## Future Enhancements

### Phase 2 Features
- Real-time collaboration on projects
- Advanced voice cloning capabilities
- Multi-language support
- Mobile application
- API marketplace for third-party integrations

### Phase 3 Features
- Live audiobook streaming
- Community voice sharing
- AI-powered voice recommendation
- Advanced audio editing tools
- Integration with audiobook platforms

## Risk Assessment

### Technical Risks
- **AI API Rate Limits**: Implement queuing and fallback providers
- **Large File Processing**: Use streaming and chunked processing
- **Voice Quality Consistency**: Implement quality scoring algorithms
- **Storage Costs**: Implement data lifecycle policies

### Business Risks
- **AI Provider Changes**: Multi-provider architecture for redundancy
- **Legal/Copyright Issues**: Content validation and user agreements
- **Scalability Costs**: Implement usage monitoring and limits
- **Security Breaches**: Regular security audits and penetration testing