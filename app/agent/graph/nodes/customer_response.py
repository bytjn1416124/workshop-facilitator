from typing import Dict, List, Any
from xrx_agent_framework import Node

class CustomerResponse(Node):
    """Node for generating customer-facing responses."""
    
    async def process(self, messages: List[Dict[str, Any]], **kwargs) -> Dict[str, Any]:
        """
        Process messages and generate a customer-facing response.
        
        Args:
            messages (List[Dict[str, Any]]): List of conversation messages
            
        Returns:
            Dict[str, Any]: Response containing messages and output
        """
        if not messages:
            return {
                "messages": [],
                "output": "No input provided",
                "node": "CustomerResponse"
            }
            
        output = {
            "messages": messages,
            "output": messages[-1]["content"] if messages else "",
            "node": "CustomerResponse"
        }
        
        return output
        
    async def get_successors(self, output: Dict[str, Any], **kwargs) -> List[Dict[str, Any]]:
        """
        Determine the next nodes to process.
        
        Args:
            output (Dict[str, Any]): Output from process step
            
        Returns:
            List[Dict[str, Any]]: List of next nodes and their inputs
        """
        return []  # Terminal node