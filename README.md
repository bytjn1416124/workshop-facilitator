# Workshop Facilitator

Interactive voice-enabled workshop facilitation system built with xRx framework for West London Forensic Services Cultural Competency Training.

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

## Prerequisites

- Docker and Docker Compose
- Node.js 16+ (local development)
- Python 3.9+ (local development)
- API Keys:
  - Groq (LLM and STT)
  - ElevenLabs (TTS)

## Quick Start

1. Clone repository with submodules:
```bash
git clone --recursive https://github.com/bytjn1416124/workshop-facilitator.git
cd workshop-facilitator
```

2. Set up environment:
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. Build and start services:
```bash
docker-compose up --build
```

4. Access components:
- Workshop UI: http://localhost:3000
- Reasoning API: http://localhost:8003
- STT Service: http://localhost:8001
- TTS Service: http://localhost:8002

## Development

### Backend
```bash
pip install -r requirements.txt
python -m pytest tests/
uvicorn app.main:app --reload
```

### Frontend
```bash
cd client
npm install
npm run dev
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

Run test suite:
```bash
# Unit tests
python -m pytest tests/

# Coverage report
python -m pytest --cov=app tests/
```

## Troubleshooting

1. WebSocket Connection
```bash
docker-compose logs xrx-orchestrator
```

2. Audio Processing
```bash
docker-compose logs xrx-stt
```

3. Voice Synthesis
```bash
docker-compose logs xrx-tts
```

## Support

- Documentation: Check `/docs` directory
- Issues: Submit via GitHub Issues
- Questions: Use GitHub Discussions

## License

MIT License - see [LICENSE](LICENSE)