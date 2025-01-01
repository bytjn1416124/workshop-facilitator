# xRx Core Integration

This directory contains the xRx framework core components as a Git submodule. The framework provides essential services for the workshop facilitator:

- Orchestrator (WebSocket handling and service coordination)
- STT (Speech-to-Text conversion)
- TTS (Text-to-Speech synthesis)
- Client (Base React components)

## Setup

To initialize the xRx core framework:

```bash
# Initialize submodule
git submodule add https://github.com/8090-inc/xrx-core.git
git submodule update --init --recursive

# Build and start services
docker-compose up --build
```

## Services

### Orchestrator (Port 8000)
- Main service coordination
- WebSocket message routing
- State management

### STT Service (Port 8001)
- Real-time audio transcription
- Multiple provider support (Groq, DeepGram)
- Streaming capabilities

### TTS Service (Port 8002)
- Text-to-speech conversion
- Voice customization
- Multiple provider support (ElevenLabs)

### Client Framework
- React components
- WebSocket integration
- UI utilities

## Configuration

Each service can be configured through environment variables in `.env`:

```env
# STT Configuration
STT_PROVIDER=groq
GROQ_STT_API_KEY=<your_key>

# TTS Configuration
TTS_PROVIDER=elevenlabs
ELEVENLABS_API_KEY=<your_key>

# WebSocket Configuration
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

## Development

For local development:

1. Run services individually:
```bash
docker-compose up orchestrator
docker-compose up stt
docker-compose up tts
```

2. Use development overrides:
```bash
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up
```

## Updating

To update the xRx core framework:

```bash
git submodule update --remote
git add xrx-core
git commit -m "Update xRx core framework"
```