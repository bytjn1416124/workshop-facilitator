import os
from openai import OpenAI
from typing import List, Dict, Any

def initialize_llm_client() -> OpenAI:
    """Initialize and return the LLM client."""
    return OpenAI(
        api_key=os.environ["LLM_API_KEY"],
        base_url=os.environ["LLM_BASE_URL"]
    )

def create_system_prompt(section: str, context: Dict = None) -> str:
    """Create a system prompt for the workshop facilitator."""
    base_prompt = """
    You are an expert cultural competency workshop facilitator for forensic mental health services. 
    Your role is to guide participants through discussions and activities professionally and engagingly.
    Maintain a supportive, inclusive tone while ensuring discussions stay focused and productive.
    
    Key Responsibilities:
    - Guide discussions while keeping time limits in mind
    - Encourage participation from all attendees
    - Connect participants' experiences to workshop concepts
    - Manage sensitive topics professionally
    - Support learning through practical examples
    """
    
    section_prompts = {
        "introduction": """
        Focus on creating a welcoming atmosphere and establishing workshop expectations.
        Encourage brief introductions and highlight the importance of cultural competency in forensic settings.
        """,
        
        "key_concepts": """
        Explain core concepts clearly, using practical examples from forensic mental health.
        Encourage participants to share their understanding and experiences.
        """,
        
        "scenario_discussion": """
        Guide analysis of case scenarios, highlighting cultural factors and their impact.
        Help participants identify potential biases and cultural safety considerations.
        """,
        
        "population_data": """
        Facilitate discussion of demographic data and its implications.
        Help participants understand patterns and disparities in service use.
        """
    }
    
    prompt = f"{base_prompt}\n\nCurrent Section Focus: {section_prompts.get(section, '')}\n"
    
    if context:
        prompt += f"\nAdditional Context: {context}"
    
    return prompt

def process_llm_response(response: Dict) -> str:
    """Process and format the LLM response for workshop delivery."""
    if not response or "choices" not in response:
        return "I apologize, but I couldn't generate a response. Let's continue with our discussion."
    
    content = response.choices[0].message.content
    return format_facilitator_response(content)

def format_facilitator_response(content: str) -> str:
    """Format the response in a facilitator's voice."""
    # Remove any existing "Facilitator:" prefix
    if content.startswith("Facilitator:"):
        content = content[11:].strip()
    
    return f"Facilitator: {content}"

def generate_activity_prompt(activity_type: str, duration: int, context: Dict = None) -> str:
    """Generate prompts for specific workshop activities."""
    activity_prompts = {
        "discussion": """
        Lead a focused group discussion. 
        Encourage participation, manage time, and synthesize key points.
        """,
        
        "reflection": """
        Guide individual reflection on practice. 
        Help participants connect concepts to their work.
        """,
        
        "role_play": """
        Facilitate role-play exercises sensitively. 
        Focus on learning and improvement rather than criticism.
        """,
        
        "planning": """
        Support action planning for improved practice. 
        Focus on concrete, achievable steps.
        """
    }
    
    base_prompt = activity_prompts.get(activity_type, "Guide this activity effectively.")
    time_guide = f"This activity is planned for {duration // 60} minutes."
    
    prompt = f"{base_prompt}\n{time_guide}"
    
    if context:
        prompt += f"\nContext: {context}"
    
    return prompt