# Cultural Competency Workshop Facilitator

An interactive, voice-enabled workshop facilitation system built with the xRx framework for West London Forensic Services. This application provides real-time transcription, text-to-speech, and interactive visual aids for delivering cultural competency training.

## Features

### Core Capabilities
- 🎤 Voice-based interaction with real-time transcription
- 🔊 Natural text-to-speech responses
- 📊 Interactive visual aids and widgets
- ⏱️ Automated session timing and management
- 📝 Real-time note-taking and feedback collection

### Workshop Components
- Cultural competency assessments
- Interactive case scenarios
- Demographic data visualization
- Service user journey mapping
- Action planning tools

## Architecture

The application uses a microservices architecture through Docker containers:

```
┌─────────────────┐     ┌─────────────────┐
│   Client (3000) │ ←→  │ Orchestrator    │
└─────────────────┘     │     (8000)      │
                        └─────────┬─────────┘
                                 ↓
┌────────────────┐    ┌─────────┴─────────┐    ┌────────────────┐
│  STT (8001)    │ ←→ │   Reasoning Agent │ ←→ │   TTS (8002)   │
└────────────────┘    │      (8003)       │    └────────────────┘
                      └─────────┬─────────┘
                              ↓
                      ┌─────────────────┐
                      │  Redis (6379)   │
                      └─────────────────┘
```

## Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local development)
- Python 3.9+ (for local development)
- API keys for:
  - Groq (LLM and STT)
  - ElevenLabs (TTS)

## Quick Start

1. Clone the repository with submodules:
```bash
git clone --recursive https://github.com/bytjn1416124/workshop-facilitator.git
cd workshop-facilitator
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env to add your API keys
```

3. Build and start services:
```bash
docker-compose up --build
```

4. Access the application:
- Workshop UI: http://localhost:3000
- Reasoning API: http://localhost:8003
- STT Service: http://localhost:8001
- TTS Service: http://localhost:8002

## Development Setup

### Backend Development
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run tests
python -m pytest tests/

# Start FastAPI server
uvicorn app.main:app --reload
```

### Frontend Development
```bash
cd client
npm install
npm run dev
```

### Environment Variables

Required environment variables:

```env
# LLM Configuration
LLM_API_KEY=<your_groq_api_key>
LLM_BASE_URL=https://api.groq.com/openai/v1
LLM_MODEL_ID=llama3-70b-8192

# STT Configuration
STT_PROVIDER=groq
GROQ_STT_API_KEY=<your_groq_api_key>

# TTS Configuration
TTS_PROVIDER=elevenlabs
ELEVENLABS_API_KEY=<your_elevenlabs_api_key>
ELEVENLABS_VOICE_ID=<your_voice_id>
```

## Project Structure

```
workshop-facilitator/
├── app/                    # Backend application
│   ├── agent/             # Agent logic
│   │   ├── executor.py    # Main agent execution
│   │   ├── graph/         # Processing graph
│   │   ├── tools/         # Custom tools
│   │   └── utils/         # Utilities
│   ├── main.py            # FastAPI application
│   └── workshop_content.json
├── client/                # Frontend application
│   ├── src/              
│   │   ├── components/    # React components
│   │   └── app/          # Next.js app
│   └── public/           
├── xrx-core/             # Core xRx framework
│   ├── orchestrator/     # WebSocket orchestration
│   ├── stt/             # Speech-to-Text service
│   ├── tts/             # Text-to-Speech service
│   └── client/          # Base components
├── tests/                # Test suite
└── docker-compose.yaml   # Service configuration
```

## Workshop Content

The workshop covers:

1. Introduction
   - Cultural Competency in Forensic Settings
   - Health Inequalities
   - Intersectionality

2. Core Modules
   - Cultural Assessment
   - Service User Journey
   - Communication Strategies
   - Risk Assessment

3. Interactive Elements
   - Case Discussions
   - Role-play Scenarios
   - Group Activities
   - Action Planning

## Available Widgets

1. ChecklistWidget
   - Task completion tracking
   - Self-assessment tools
   - Action item management

2. FlowchartWidget
   - Process visualization
   - Decision trees
   - Service user journeys

3. DataTableWidget
   - Demographic data
   - Service statistics
   - Outcome measures

4. ChartWidget
   - Data visualization
   - Trend analysis
   - Comparative stats

## Testing

Run the test suite:
```bash
# Unit tests
python -m pytest tests/

# Coverage report
python -m pytest --cov=app tests/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## Deployment

For production deployment:

```bash
# Build production images
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml build

# Deploy services
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d
```

## Troubleshooting

Common issues and solutions:

1. WebSocket Connection
   ```bash
   # Check WebSocket service
   docker-compose logs xrx-orchestrator
   ```

2. Audio Processing
   ```bash
   # Verify STT service
   docker-compose logs xrx-stt
   ```

3. Voice Synthesis
   ```bash
   # Check TTS service
   docker-compose logs xrx-tts
   ```

## Support

- Documentation: Check the `/docs` directory
- Issues: Submit via GitHub Issues
- Questions: Use GitHub Discussions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [xRx Framework](https://github.com/8090-inc/xrx-core)
- West London Forensic Services
- All contributors