# Workshop Facilitator

A Cultural Competency Workshop Facilitator application built with the xRx framework for West London Forensic Services. This application provides an interactive, voice-enabled workshop experience with real-time transcription and visual aids.

## Features

- Interactive voice-based facilitation using STT and TTS
- Visual aids and widgets for workshop activities
- Real-time discussion management
- Progress tracking
- Customizable workshop content
- Support for multiple workshop sections
- Integration with forensic mental health context

## Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local development)
- Python 3.9+ (for local development)
- API keys for:
  - Groq (LLM and STT)
  - ElevenLabs (TTS)
  - Redis (for session management)

## Installation

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

## Project Structure

```
workshop-facilitator/
├── app/                    # Backend application
│   ├── agent/             # Agent logic and tools
│   ├── main.py            # FastAPI application
│   └── workshop_content.json  # Content structure
├── client/                # Frontend application
│   ├── src/              
│   │   ├── components/    # React components
│   │   └── app/          # Next.js app
│   └── public/           
├── xrx-core/             # Core xRx framework
├── tests/                # Test files
└── docker-compose.yaml   # Docker composition
```

## Usage

Access the application components:
- Frontend: http://localhost:3000
- Reasoning API: http://localhost:8003
- STT service: http://localhost:8001
- TTS service: http://localhost:8002

### Workshop Sections

1. Introduction
   - Key concepts
   - Workshop overview
   - Participant introductions

2. Cultural Competency Foundations
   - Core concepts
   - Forensic context
   - Interactive discussions

3. Case Scenarios
   - Real-world examples
   - Group discussions
   - Practice exercises

4. Assessment and Planning
   - Progress tracking
   - Action planning
   - Resource sharing

## Development

### Local Development Setup

1. Install dependencies:
```bash
# Backend
cd app
pip install -r requirements.txt

# Frontend
cd client
npm install
```

2. Start development servers:
```bash
# Backend
python -m uvicorn main:app --reload

# Frontend
npm run dev
```

### Running Tests
```bash
python -m pytest tests/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.