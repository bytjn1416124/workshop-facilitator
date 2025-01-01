"""Test suite for the workshop facilitator application."""

import pytest
import asyncio

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture
def mock_llm_client():
    """Mock LLM client for testing."""
    class MockLLMClient:
        def chat(self):
            class ChatCompletion:
                def create(self, *args, **kwargs):
                    class Choice:
                        def __init__(self):
                            self.message = {"content": "Test response"}
                    return type('Response', (), {'choices': [Choice()]})
            return ChatCompletion()
    return MockLLMClient()
