# VoxFoundry Development Instructions

## Project Structure

```
VoxFoundry/
├── docs/                           # Documentation
│   ├── ARCHITECTURE.md             # System architecture
│   ├── API.md                     # API documentation
│   ├── DEPLOYMENT.md              # Deployment guide
│   └── DEVELOPMENT.md             # This file
├── packages/                       # Monorepo packages
│   ├── shared/                    # Shared utilities and types
│   │   ├── types/                 # TypeScript type definitions
│   │   ├── utils/                 # Common utilities
│   │   ├── validators/            # Input validation schemas
│   │   └── constants/             # Shared constants
│   ├── frontend/                  # React/Next.js frontend
│   │   ├── apps/
│   │   │   ├── voxforge/          # Main EPUB processing app
│   │   │   ├── voice-library/     # Voice management app
│   │   │   └── profile-creator/   # Voice profile creation app
│   │   ├── components/            # Shared React components
│   │   ├── hooks/                 # Custom React hooks
│   │   └── styles/               # Global styles and themes
│   ├── backend/                   # Node.js/Express backend
│   │   ├── api-gateway/           # Main API gateway service
│   │   ├── services/
│   │   │   ├── epub-processor/    # EPUB parsing service
│   │   │   ├── llm-analyzer/      # LLM integration service
│   │   │   ├── voice-synthesizer/ # Voice synthesis service
│   │   │   ├── voice-manager/     # Voice profile management
│   │   │   └── profile-creator/   # Voice profile generation
│   │   ├── database/             # Database schemas and migrations
│   │   └── shared/               # Backend shared utilities
├── infrastructure/                # DevOps and deployment
│   ├── docker/                   # Docker configurations
│   ├── kubernetes/               # K8s manifests
│   ├── terraform/                # Infrastructure as code
│   └── monitoring/               # Monitoring configs
├── tests/                         # Test files
│   ├── e2e/                      # End-to-end tests
│   ├── integration/              # Integration tests
│   └── performance/              # Performance tests
├── scripts/                       # Build and utility scripts
├── .github/                      # GitHub Actions workflows
├── docker-compose.yml            # Local development setup
├── package.json                  # Root package.json
├── turbo.json                    # Turborepo configuration
└── README.md                     # Project overview
```

## Development Setup

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- PostgreSQL 15+
- Redis 7+

### Initial Setup
```bash
# Clone repository
git clone https://github.com/TheMrFish3D/VoxFoundry.git
cd VoxFoundry

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development services
docker-compose up -d postgres redis

# Run database migrations
npm run db:migrate

# Start development servers
npm run dev
```

## Agent Development Instructions

### Code Standards and Practices

#### TypeScript Configuration
- Use strict mode with no implicit any
- Enable all recommended ESLint rules
- Follow functional programming patterns where possible
- Use Zod for runtime type validation

#### Component Architecture
```typescript
// Example component structure
interface ComponentProps {
  // Props definition
}

export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks at the top
  const [state, setState] = useState<StateType>();
  const { data, loading, error } = useQuery();
  
  // Event handlers
  const handleEvent = useCallback(() => {
    // Implementation
  }, [dependencies]);
  
  // Early returns for loading/error states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  // Main render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

#### API Development Patterns
```typescript
// tRPC router example
export const bookRouter = router({
  upload: publicProcedure
    .input(
      z.object({
        file: z.instanceof(File),
        title: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Implementation with proper error handling
      try {
        const result = await uploadBook(input);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to upload book',
          cause: error,
        });
      }
    }),
});
```

### Testing Requirements

#### Unit Tests
- Minimum 80% code coverage
- Test all public methods and components
- Mock external dependencies
- Use descriptive test names

```typescript
describe('BookUploader', () => {
  it('should upload EPUB file successfully', async () => {
    // Arrange
    const mockFile = new File(['content'], 'test.epub', { type: 'application/epub+zip' });
    const mockUpload = jest.fn().mockResolvedValue({ id: '123' });
    
    // Act
    const result = await uploadBook(mockFile);
    
    // Assert
    expect(mockUpload).toHaveBeenCalledWith(mockFile);
    expect(result.id).toBe('123');
  });
});
```

#### Integration Tests
- Test API endpoints with real database
- Validate data persistence and retrieval
- Test error scenarios and edge cases

#### E2E Tests
- Cover critical user journeys
- Test complete workflows end-to-end
- Include error recovery scenarios

### AI Integration Guidelines

#### LLM Provider Integration
```typescript
// Abstract LLM provider interface
interface LLMProvider {
  name: string;
  generateActingNotes(text: string, context: AnalysisContext): Promise<ActingNotes>;
  extractCharacters(text: string): Promise<Character[]>;
  analyzeDialogue(dialogue: string, character: Character): Promise<DialogueAnalysis>;
}

// Implementation example
class OpenAIProvider implements LLMProvider {
  async generateActingNotes(text: string, context: AnalysisContext): Promise<ActingNotes> {
    // Implementation with retry logic and error handling
  }
}
```

#### Voice Synthesis Integration
```typescript
interface VoiceSynthesizer {
  name: string;
  synthesize(text: string, voiceId: string, options?: SynthesisOptions): Promise<AudioBuffer>;
  getAvailableVoices(): Promise<Voice[]>;
  cloneVoice(samples: AudioSample[]): Promise<VoiceProfile>;
}
```

### Database Interaction Patterns

#### Repository Pattern
```typescript
interface BookRepository {
  create(book: CreateBookInput): Promise<Book>;
  findById(id: string): Promise<Book | null>;
  update(id: string, updates: UpdateBookInput): Promise<Book>;
  delete(id: string): Promise<void>;
}

class PostgresBookRepository implements BookRepository {
  async create(book: CreateBookInput): Promise<Book> {
    const query = `
      INSERT INTO books (title, author, file_path, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await this.db.query(query, [book.title, book.author, book.filePath, book.userId]);
    return mapToBook(result.rows[0]);
  }
}
```

### Error Handling Standards

#### Frontend Error Boundaries
```typescript
class ErrorBoundary extends React.Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service
    logger.error('React Error Boundary', { error, errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

#### Backend Error Handling
```typescript
// Global error handler middleware
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error('Unhandled error', { 
    error: err.message, 
    stack: err.stack,
    url: req.url,
    method: req.method 
  });
  
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: 'Validation failed', details: err.details });
  }
  
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  
  res.status(500).json({ error: 'Internal server error' });
};
```

### Performance Optimization

#### Frontend Optimization
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Lazy load routes and components
- Optimize bundle size with code splitting

#### Backend Optimization
- Implement database query optimization
- Use Redis for caching frequently accessed data
- Implement request batching for external APIs
- Use streaming for large file uploads/downloads

### Security Implementation

#### Authentication
```typescript
// JWT middleware
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

#### Input Validation
```typescript
// Zod schema validation
const CreateBookSchema = z.object({
  title: z.string().min(1).max(500),
  author: z.string().max(255).optional(),
  file: z.instanceof(File).refine(
    (file) => file.type === 'application/epub+zip',
    'File must be an EPUB'
  ),
});
```

### Documentation Requirements

#### Code Documentation
- JSDoc for all public functions and classes
- README files for each package
- API documentation with OpenAPI/Swagger
- Architecture decision records (ADRs)

#### User Documentation
- User guides for each application
- API integration guides
- Troubleshooting documentation
- Video tutorials for complex workflows

### Deployment Guidelines

#### Environment Configuration
```typescript
// Environment validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  OPENAI_API_KEY: z.string().min(1),
  ELEVENLABS_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

#### Docker Configuration
```dockerfile
# Multi-stage build for production
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
```

### Monitoring and Observability

#### Logging
```typescript
// Structured logging with Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

#### Metrics Collection
```typescript
// Prometheus metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});
```

### Development Workflow

#### Feature Development
1. Create feature branch from main
2. Implement feature with tests
3. Run full test suite
4. Create pull request with description
5. Code review and approval
6. Merge to main

#### Release Process
1. Create release branch
2. Update version numbers
3. Run full test suite including E2E
4. Create release notes
5. Deploy to staging
6. User acceptance testing
7. Deploy to production
8. Tag release in Git

## Common Development Tasks

### Adding New API Endpoint
1. Define tRPC router procedure
2. Implement business logic
3. Add input/output validation
4. Write unit tests
5. Add integration tests
6. Update API documentation

### Adding New React Component
1. Create component with TypeScript
2. Add prop validation with TypeScript interfaces
3. Implement accessibility features
4. Write unit tests with React Testing Library
5. Add Storybook story
6. Update component documentation

### Database Schema Changes
1. Create migration file
2. Update TypeScript types
3. Update repository methods
4. Add migration tests
5. Update API responses if needed
6. Document schema changes

This guide ensures consistent, high-quality development across all team members and automated agents working on the VoxFoundry project.