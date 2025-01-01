# Workshop Facilitator

A Cultural Competency Workshop Facilitator application built with the xRx framework for West London Forensic Services. This application provides an interactive, voice-enabled workshop experience with real-time transcription and visual aids.

## Features

- Voice interaction using STT (Speech-to-Text) and TTS (Text-to-Speech)
- Interactive visual widgets for workshop activities
- Timed discussion management
- Progress tracking
- Visual aids and data visualization
- Support for multiple workshop sections
- Real-time participant feedback

## Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local development)
- Python 3.9+ (for local development)
- API keys for:
  - Groq (LLM and STT)
  - ElevenLabs (TTS)

## Getting Started

1. Clone the repository with submodules:
```bash
git clone --recursive https://github.com/bytjn1416124/workshop-facilitator.git
cd workshop-facilitator
```

2. Copy the environment template and fill in your API keys:
```bash
cp .env.example .env
```

3. Build and start the containers:
```bash
docker-compose up --build
```

4. Access the application:
- Frontend: http://localhost:3000
- Reasoning API: http://localhost:8003
- STT service: http://localhost:8001
- TTS service: http://localhost:8002

## Project Structure

```
workshop-facilitator/
├── app/                    # Backend application
├── client/                 # Frontend application
├── xrx-core/              # Core xRx framework
├── tests/                 # Test files
└── docker-compose.yaml    # Docker composition
```

## Development

### Running Tests
```bash
python -m pytest tests/
```

### Local Development
1. Start the backend:
```bash
cd app
python -m uvicorn main:app --reload
```

2. Start the frontend:
```bash
cd client
npm install
npm run dev
```

## Documentation

- [API Documentation](docs/API.md)
- [Widget Documentation](docs/Widgets.md)
- [Workshop Content Structure](docs/WorkshopContent.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
