# VoxFoundry 🎭📚🎙️

**AI-Powered Multi-Actor Audiobook Generation Platform**

VoxFoundry is a comprehensive web application ecosystem that transforms EPUB books into immersive multi-actor audiobooks using cutting-edge AI technology. The platform analyzes text, generates detailed acting notes, and synthesizes realistic voice performances for each character.

[![CI/CD Pipeline](https://github.com/TheMrFish3D/VoxFoundry/actions/workflows/ci.yml/badge.svg)](https://github.com/TheMrFish3D/VoxFoundry/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 Features

### 📖 VoxForge Main App
- **EPUB Processing**: Advanced parsing and text extraction
- **AI Analysis**: Character detection and dialogue attribution
- **Acting Notes**: LLM-generated performance directions
- **Multi-Voice Synthesis**: Automated audiobook generation
- **Quality Control**: Human review and adjustment tools

### 🎯 Voice Library Manager
- **Voice Profiles**: Comprehensive voice management system
- **Quality Assessment**: Automated voice sample evaluation
- **Categorization**: Advanced tagging and search capabilities
- **Bulk Operations**: Efficient voice library management

### 🔍 Voice Profile Creator
- **Actor Search**: Automated voice sample discovery
- **Profile Generation**: AI-powered voice characterization
- **Sample Analysis**: Quality validation and enhancement
- **Integration**: Seamless library integration

## 🏗️ Architecture

VoxFoundry is built as a modern, scalable monorepo using:

- **Frontend**: React 18+ with Next.js 14, TypeScript, and Tailwind CSS
- **Backend**: Node.js with Express, tRPC for type-safe APIs
- **Database**: PostgreSQL 15+ with Redis caching
- **AI Integration**: OpenAI, Anthropic, Google AI for LLM processing
- **Voice Synthesis**: ElevenLabs, Azure Speech, Google TTS
- **Infrastructure**: Docker, Kubernetes, GitHub Actions

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
                    │ • AI Integration│
                    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- PostgreSQL 15+
- Redis 7+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheMrFish3D/VoxFoundry.git
   cd VoxFoundry
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

4. **Start development services**
   ```bash
   npm run docker:dev
   ```

5. **Run database migrations**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

6. **Start development servers**
   ```bash
   npm run dev
   ```

The applications will be available at:
- **VoxForge App**: http://localhost:3000
- **Voice Library**: http://localhost:3001
- **Profile Creator**: http://localhost:3002
- **API Gateway**: http://localhost:8000

## 📚 Documentation

- **[Architecture Documentation](ARCHITECTURE.md)** - System design and technical architecture
- **[Development Guide](DEVELOPMENT.md)** - Development setup and coding standards
- **[Project Plan](PROJECT_PLAN.md)** - Detailed development roadmap and milestones
- **[API Documentation](docs/API.md)** - Comprehensive API reference
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions

## 🛠️ Development

### Project Structure
```
VoxFoundry/
├── packages/
│   ├── shared/              # Shared types and utilities
│   ├── frontend/            # React applications
│   │   ├── apps/voxforge/   # Main EPUB processing app
│   │   ├── apps/voice-library/ # Voice management app
│   │   └── apps/profile-creator/ # Voice profile creator
│   └── backend/             # Node.js services
│       ├── api-gateway/     # Main API gateway
│       └── services/        # Microservices
├── infrastructure/          # DevOps configurations
├── tests/                   # Test suites
└── docs/                    # Documentation
```

### Available Scripts

```bash
# Development
npm run dev                  # Start all services in development mode
npm run build               # Build all packages
npm run test                # Run test suites
npm run lint                # Lint all packages
npm run type-check          # TypeScript type checking

# Database
npm run db:migrate          # Run database migrations
npm run db:seed             # Seed development data

# Docker
npm run docker:dev          # Start development services
npm run docker:prod         # Start production services

# Setup
npm run setup               # Complete development setup
```

## 🤖 AI Integration

VoxFoundry integrates with multiple AI providers for robust, scalable processing:

### LLM Providers
- **OpenAI**: GPT-4, GPT-4-Turbo for advanced text analysis
- **Anthropic**: Claude-3 for nuanced character understanding
- **Google AI**: Gemini for multilingual support

### Voice Synthesis
- **ElevenLabs**: High-quality voice cloning and synthesis
- **Azure Speech**: Enterprise-grade text-to-speech
- **Google TTS**: Broad language and voice support

## 🔧 Configuration

### Environment Variables

Essential configuration for development:

```bash
# Database
DATABASE_URL=postgres://user:pass@localhost:5432/voxfoundry
REDIS_URL=redis://localhost:6379

# AI Providers
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
ELEVENLABS_API_KEY=your-elevenlabs-key

# Authentication
JWT_SECRET=your-secure-jwt-secret
```

See `.env.example` for complete configuration options.

## 🧪 Testing

VoxFoundry maintains comprehensive test coverage:

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e

# Performance tests
npm run test:performance
```

## 🚢 Deployment

### Development Deployment
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Production Deployment
```bash
# Using Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# Using Kubernetes
kubectl apply -f infrastructure/kubernetes/
```

## 📈 Performance

Target performance metrics:
- **File Upload**: <30s for 50MB EPUB files
- **LLM Analysis**: <5 minutes per chapter
- **Voice Synthesis**: <2 minutes per 1000 words
- **Concurrent Users**: 1000+ supported

## 🔒 Security

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting and DDoS protection
- Encryption at rest and in transit

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

### Code Standards
- TypeScript strict mode
- ESLint + Prettier formatting
- Comprehensive test coverage
- Detailed documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT models and API
- **ElevenLabs** for voice synthesis technology
- **React** and **Next.js** communities
- **Node.js** ecosystem contributors

## 📞 Support

- **Documentation**: [GitHub Wiki](https://github.com/TheMrFish3D/VoxFoundry/wiki)
- **Issues**: [GitHub Issues](https://github.com/TheMrFish3D/VoxFoundry/issues)
- **Discussions**: [GitHub Discussions](https://github.com/TheMrFish3D/VoxFoundry/discussions)

---

**Built with ❤️ by the VoxFoundry Team**

*Transforming written stories into immersive audio experiences through the power of AI.* 
