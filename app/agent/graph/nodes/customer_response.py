# P# app/agent/graph/nodes/customer_response.py
from typing import Dict, List, Any
from xrx_agent_framework import Node

class CustomerResponse(Node):
    """Node for generating workshop facilitator responses."""
    
    async def process(self, messages: List[Dict[str, Any]], **kwargs) -> Dict[str, Any]:
        """Process messages and generate a facilitator response."""
        if not messages:
            return {
                "messages": [],
                "output": "No input provided",
                "node": "CustomerResponse"
            }
            
        last_message = messages[-1]["content"] if messages else ""
        
        # Extract workshop context
        workshop_context = kwargs.get("workshop_context", {})
        current_section = workshop_context.get("current_section", "")
        time_remaining = workshop_context.get("time_remaining", None)
        
        # Add time warning if needed
        time_warning = ""
        if time_remaining and time_remaining < 60:  # Less than 1 minute
            time_warning = " (We have less than a minute left for this section.)"
        elif time_remaining and time_remaining < 180:  # Less than 3 minutes
            time_warning = " (We have a few minutes left for this section.)"
            
        # Construct response with context
        output_message = last_message + time_warning
        
        output = {
            "messages": messages,
            "output": output_message,
            "node": "CustomerResponse",
            "workshop_section": current_section,
            "metadata": {
                "time_remaining": time_remaining,
                "section_status": workshop_context.get("section_status", "in_progress")
            }
        }
        
        return output
        
    async def get_successors(self, output: Dict[str, Any], **kwargs) -> List[Dict[str, Any]]:
        """Determine next nodes to process."""
        successors = []
        
        # Check if we need to move to visual aids
        metadata = output.get("metadata", {})
        if metadata.get("requires_visual_aid"):
            successors.append({
                "node": "Widget",
                "input": output
            })
            
        # Check if we need task description
        if metadata.get("new_task"):
            successors.append({
                "node": "TaskDescription",
                "input": output
            })
            
        return successorsreviously created customer_response.py content
