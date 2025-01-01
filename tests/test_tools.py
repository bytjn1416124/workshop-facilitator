"""Tests for the workshop tools module."""

import pytest
from app.agent.tools.workshop_tools import (
    start_discussion,
    check_discussion_time,
    record_participant_input,
    show_visual_aid,
    manage_breakout,
    track_completion,
    collect_feedback,
    set_timer,
    record_action_item,
    manage_resources
)

@pytest.fixture
def sample_discussion():
    """Create a sample discussion for testing."""
    return start_discussion("Cultural Competency Basics", 180)

@pytest.fixture
def sample_visual_aid():
    """Create a sample visual aid for testing."""
    return {
        "type": "checklist",
        "content": {
            "items": ["Item 1", "Item 2", "Item 3"],
            "title": "Test Checklist"
        }
    }

def test_start_discussion():
    """Test starting a new discussion."""
    result = start_discussion("Test Topic", 180)
    assert result["topic"] == "Test Topic"
    assert result["duration"] == 180
    assert result["status"] == "active"
    assert "start_time" in result

def test_check_discussion_time(sample_discussion):
    """Test checking remaining discussion time."""
    result = check_discussion_time(str(sample_discussion["start_time"]))
    assert "time_remaining" in result
    assert "status" in result

def test_record_participant_input():
    """Test recording participant input."""
    result = record_participant_input(
        participant_id="P001",
        input_type="comment",
        content="Test comment"
    )
    assert result["participant_id"] == "P001"
    assert result["input_type"] == "comment"
    assert result["content"] == "Test comment"
    assert result["status"] == "recorded"
    assert "timestamp" in result

def test_show_visual_aid(sample_visual_aid):
    """Test displaying visual aids."""
    result = show_visual_aid(
        aid_type="checklist",
        content=sample_visual_aid["content"]
    )
    assert result["type"] == "checklist"
    assert result["status"] == "displayed"
    assert "content" in result
    assert "timestamp" in result

def test_show_visual_aid_invalid_type():
    """Test handling invalid visual aid types."""
    result = show_visual_aid(
        aid_type="invalid_type",
        content={}
    )
    assert result["status"] == "error"
    assert "message" in result

def test_manage_breakout():
    """Test breakout session management."""
    groups = [
        {"id": 1, "participants": ["P001", "P002"]},
        {"id": 2, "participants": ["P003", "P004"]}
    ]
    result = manage_breakout(groups, 300)
    assert len(result["groups"]) == 2
    assert result["duration"] == 300
    assert result["status"] == "active"
    assert "start_time" in result

def test_track_completion():
    """Test section completion tracking."""
    result = track_completion("introduction", True)
    assert result["section"] == "introduction"
    assert result["completed"] is True
    assert "timestamp" in result

def test_collect_feedback_valid():
    """Test collecting valid feedback."""
    result = collect_feedback(
        section="introduction",
        rating=5,
        comments="Very helpful session"
    )
    assert result["section"] == "introduction"
    assert result["rating"] == 5
    assert result["comments"] == "Very helpful session"
    assert result["status"] == "received"

def test_collect_feedback_invalid_rating():
    """Test collecting feedback with invalid rating."""
    result = collect_feedback(
        section="introduction",
        rating=6,
        comments="Test comment"
    )
    assert result["status"] == "error"
    assert "message" in result

def test_set_timer():
    """Test timer functionality."""
    result = set_timer(300)
    assert result["duration"] == 300
    assert "alert_at" in result
    assert result["status"] == "started"
    assert "start_time" in result

def test_record_action_item():
    """Test recording action items."""
    result = record_action_item(
        item="Review cultural assessment tools",
        assigned_to="John Doe",
        deadline="2025-02-01"
    )
    assert result["item"] == "Review cultural assessment tools"
    assert result["assigned_to"] == "John Doe"
    assert result["deadline"] == "2025-02-01"
    assert result["status"] == "pending"

def test_manage_resources_valid():
    """Test resource management with valid type."""
    content = {
        "title": "Cultural Assessment Guide",
        "format": "PDF",
        "url": "path/to/guide.pdf"
    }
    result = manage_resources("handout", content)
    assert result["type"] == "handout"
    assert result["status"] == "available"
    assert "content" in result

def test_manage_resources_invalid():
    """Test resource management with invalid type."""
    result = manage_resources(
        "invalid_type",
        {"content": "test"}
    )
    assert result["status"] == "error"
    assert "message" in result
