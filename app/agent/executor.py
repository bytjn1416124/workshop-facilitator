from typing import List, Dict, Any
import json
import os
from agent.utils.llm import initialize_llm_client
from agent.graph.nodes import (
    CustomerResponse,
    Widget,
    TaskDescriptionResponse
)

class WorkshopState:
    def __init__(self):
        self.current_section = 0
        self.sections = [
            "introduction",
            "key_concepts",
            "scenario_discussion",
            "population_data",
            "community_resources",
            "health_inequalities",
            "checklist_practice",
            "service_user_journey",
            "policy_review",
            "assessment_tools",
            "cultural_formulation",
            "presenting_issues",
            "intervention_adaptation",
            "role_play",
            "risk_assessment",
            "risk_management",
            "cultural_broker",
            "rehabilitation_programs",
            "spirituality_guidelines",
            "discharge_planning",
            "staff_assessment",
            "training_program",
            "recruitment_retention",
            "performance_indicators",
            "feedback_methods",
            "action_planning",
            "conclusion"
        ]
        self.completion_status = {section: False for section in self.sections}
        self.participant_inputs = {}
        self.current_discussion = None

llm_client = initialize_llm_client()
workshop_state = WorkshopState()

def load_workshop_content():
    """Load the workshop content from JSON file."""
    try:
        with open('workshop_content.json', 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading workshop content: {e}")
        return {}

def get_section_content(section_name: str) -> dict:
    """Get content for a specific workshop section."""
    content = load_workshop_content()
    return content.get(section_name, {})

async def single_turn_agent(messages: List[Dict[str, Any]]) -> Dict[str, Any]:
    # Rest of the executor code...