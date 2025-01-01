# app/agent/graph/nodes/task_description.py
from typing import Dict, List, Any
from xrx_agent_framework import Node

class TaskDescription(Node):
    """Node for generating workshop task descriptions and instructions."""
    
    async def process(self, messages: List[Dict[str, Any]], **kwargs) -> Dict[str, Any]:
        """Generate appropriate task descriptions based on workshop context."""
        if not messages:
            return {
                "messages": [],
                "output": "No task specified",
                "node": "TaskDescription"
            }
        
        workshop_context = kwargs.get("workshop_context", {})
        current_section = workshop_context.get("current_section", "")
        task_type = workshop_context.get("task_type", "")
        duration = workshop_context.get("duration", 180)  # Default 3 minutes
        
        # Generate task description and instructions
        task_description = self.get_task_description(current_section, task_type)
        time_info = f"We'll spend {duration // 60} minutes on this task." if duration >= 60 else ""
        
        output_text = f"{task_description} {time_info}"
        
        output = {
            "messages": messages,
            "output": output_text,
            "node": "TaskDescription",
            "section": current_section,
            "metadata": {
                "task_type": task_type,
                "duration": duration,
                "requires_group_work": task_type in ["discussion", "role_play", "breakout"],
                "requires_materials": task_type in ["checklist", "assessment", "planning"]
            }
        }
        
        return output
    
    def get_task_description(self, section: str, task_type: str) -> str:
        """Get specific task description based on workshop section and type."""
        descriptions = {
            "introduction": {
                "discussion": "Let's start with introductions. Please share your name, role, and one expectation from this workshop.",
                "overview": "We'll begin by reviewing the key concepts we'll cover today."
            },
            "key_concepts": {
                "discussion": "Let's explore what cultural competency means in forensic mental health. Share your thoughts and experiences.",
                "assessment": "Take a moment to reflect on your current cultural competency practice."
            },
            "scenario_discussion": {
                "discussion": "We'll analyze a case scenario together. Consider the cultural factors that might influence care.",
                "role_play": "We'll practice culturally sensitive communication through role-play."
            },
            "population_data": {
                "analysis": "Let's examine our service user demographics and discuss any patterns or disparities.",
                "planning": "Based on this data, we'll identify areas for service improvement."
            },
            "health_inequalities": {
                "discussion": "Let's identify health inequalities in our forensic population.",
                "planning": "We'll develop strategies to address these inequalities."
            },
            "cultural_safety": {
                "assessment": "Let's evaluate our current practices for cultural safety.",
                "planning": "We'll create action plans to enhance cultural safety in our units."
            }
        }
        
        section_tasks = descriptions.get(section, {})
        default_description = "Let's work through this section together, sharing our thoughts and experiences."
        
        return section_tasks.get(task_type, default_description)
    
    async def get_successors(self, output: Dict[str, Any], **kwargs) -> List[Dict[str, Any]]:
        """Determine next nodes to process."""
        successors = [{
            "node": "CustomerResponse",
            "input": output
        }]
        
        # If task requires materials, add Widget node
        if output.get("metadata", {}).get("requires_materials"):
            successors.append({
                "node": "Widget",
                "input": output
            })
        
        return successors
