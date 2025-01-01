# app/agent/executor.py
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
    """Manages the state of the workshop session."""
    
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

def format_facilitator_message(content: str) -> str:
    """Format the facilitator's message with appropriate tone."""
    return f"Facilitator: {content}"

def get_next_section() -> str:
    """Get the next workshop section based on current state."""
    if workshop_state.current_section < len(workshop_state.sections):
        next_section = workshop_state.sections[workshop_state.current_section]
        workshop_state.current_section += 1
        return next_section
    return "conclusion"

async def single_turn_agent(messages: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Process a single turn of the workshop conversation."""
    # Extract the latest user message
    user_message = messages[-1]["content"] if messages else ""
    
    # Get current section content
    current_section = get_section_content(workshop_state.sections[workshop_state.current_section - 1])
    
    # Generate facilitator response
    prompt = f"""
    You are a cultural competency workshop facilitator for forensic mental health services.
    Current section: {current_section.get('title', '')}
    User input: {user_message}
    
    Based on the workshop content and user input, provide an appropriate facilitator response.
    Keep the response engaging and interactive while maintaining professional tone.
    """
    
    response = llm_client.chat.completions.create(
        model=os.environ['LLM_MODEL_ID'],
        messages=[{"role": "system", "content": prompt}],
        temperature=0.7
    )
    
    facilitator_response = response.choices[0].message.content
    
    # Check if we need to show any visual aids
    widget_output = None
    if current_section.get('has_visual_aid', False):
        widget_output = create_widget_for_section(current_section)
    
    # Format the response
    message = {
        "role": "assistant",
        "content": format_facilitator_message(facilitator_response)
    }
    
    out = {
        "messages": [message],
        "node": "CustomerResponse",
        "output": message['content'],
        "widget": widget_output
    }
    
    return out

def create_widget_for_section(section: dict) -> Dict:
    """Create appropriate widget based on section content."""
    widget_type = section.get('widget_type')
    if not widget_type:
        return None
        
    if widget_type == 'checklist':
        return create_checklist_widget(section)
    elif widget_type == 'flowchart':
        return create_flowchart_widget(section)
    elif widget_type == 'data_table':
        return create_data_table_widget(section)
    
    return None

def create_checklist_widget(section: dict) -> Dict:
    """Create a checklist widget for sections that need it."""
    return {
        'type': 'checklist',
        'details': json.dumps({
            'items': section.get('checklist_items', []),
            'title': section.get('title', 'Checklist'),
            'instructions': section.get('instructions', '')
        })
    }

def create_flowchart_widget(section: dict) -> Dict:
    """Create a flowchart widget for service user journey mapping."""
    return {
        'type': 'flowchart',
        'details': json.dumps({
            'nodes': section.get('flowchart_nodes', []),
            'edges': section.get('flowchart_edges', []),
            'title': section.get('title', 'Service User Journey')
        })
    }

def create_data_table_widget(section: dict) -> Dict:
    """Create a data table widget for population data and statistics."""
    return {
        'type': 'data_table',
        'details': json.dumps({
            'headers': section.get('table_headers', []),
            'rows': section.get('table_data', []),
            'title': section.get('title', 'Population Data')
        })
    }
