from abc import ABC, abstractmethod
from typing import Dict, List, Any

class Node(ABC):
    """Base class for all graph nodes in the workshop facilitator."""

    @abstractmethod
    async def process(self, messages: List[Dict[str, Any]], **kwargs) -> Dict[str, Any]:
        """Process input messages and generate output.
        
        Args:
            messages: List of message dictionaries with role and content
            **kwargs: Additional keyword arguments for processing
            
        Returns:
            Dict containing processed output with messages and metadata
        """
        pass

    @abstractmethod
    async def get_successors(self, output: Dict[str, Any], **kwargs) -> List[Dict[str, Any]]:
        """Determine next nodes to process based on output.
        
        Args:
            output: Output dictionary from process method
            **kwargs: Additional keyword arguments
            
        Returns:
            List of dictionaries containing next nodes and their inputs
        """
        pass