# app/agent/graph/nodes/widget.py
from typing import Dict, List, Any
import json
from xrx_agent_framework import Node

class Widget(Node):
    """Node for managing workshop visual aids and interactive elements."""
    
    async def process(self, messages: List[Dict[str, Any]], **kwargs) -> Dict[str, Any]:
        """Process widget requests and generate appropriate visual aids."""
        if not messages:
            return {
                "messages": [],
                "output": {},
                "node": "Widget"
            }
        
        workshop_context = kwargs.get("workshop_context", {})
        current_section = workshop_context.get("current_section", "")
        widget_type = workshop_context.get("widget_type", "")
        
        # Generate appropriate widget based on section and type
        widget_output = self.generate_widget_output(widget_type, current_section, workshop_context)
        
        output = {
            "messages": messages,
            "output": widget_output,
            "node": "Widget",
            "widget_type": widget_type
        }
        
        return output
    
    def generate_widget_output(self, widget_type: str, section: str, context: Dict) -> Dict[str, Any]:
        """Generate specific widget content based on type and section."""
        if widget_type == "checklist":
            return self.create_checklist_widget(section, context)
        elif widget_type == "flowchart":
            return self.create_flowchart_widget(section, context)
        elif widget_type == "data_table":
            return self.create_data_table_widget(section, context)
        elif widget_type == "chart":
            return self.create_chart_widget(section, context)
        return {}
    
    def create_checklist_widget(self, section: str, context: Dict) -> Dict[str, Any]:
        """Create checklist widget content."""
        items = context.get("checklist_items", [])
        if section == "cultural_competency":
            items = [
                "Understanding of diverse cultural backgrounds",
                "Recognition of personal biases",
                "Knowledge of cultural safety principles",
                "Awareness of health inequalities",
                "Cultural communication skills"
            ]
        
        return {
            "type": "checklist",
            "details": json.dumps({
                "title": f"Checklist for {section}",
                "items": items,
                "instructions": "Please check items as they are discussed"
            })
        }
    
    def create_flowchart_widget(self, section: str, context: Dict) -> Dict[str, Any]:
        """Create flowchart widget content."""
        nodes = context.get("flowchart_nodes", [])
        edges = context.get("flowchart_edges", [])
        
        if section == "service_user_journey":
            nodes = [
                {"id": "1", "content": "Initial Contact"},
                {"id": "2", "content": "Cultural Assessment"},
                {"id": "3", "content": "Treatment Planning"},
                {"id": "4", "content": "Service Delivery"},
                {"id": "5", "content": "Progress Review"}
            ]
            edges = [
                {"from": "1", "to": "2"},
                {"from": "2", "to": "3"},
                {"from": "3", "to": "4"},
                {"from": "4", "to": "5"},
                {"from": "5", "to": "3"}
            ]
        
        return {
            "type": "flowchart",
            "details": json.dumps({
                "title": f"Process Flow for {section}",
                "nodes": nodes,
                "edges": edges
            })
        }
    
    def create_data_table_widget(self, section: str, context: Dict) -> Dict[str, Any]:
        """Create data table widget content."""
        if section == "population_data":
            return {
                "type": "data_table",
                "details": json.dumps({
                    "title": "Service User Demographics",
                    "headers": ["Ethnic Group", "Medium Secure", "Low Secure", "Local Borough"],
                    "rows": [
                        ["White British", "45%", "48%", "55%"],
                        ["Black Caribbean", "15%", "14%", "8%"],
                        ["Black African", "12%", "11%", "6%"],
                        ["Asian", "10%", "9%", "15%"],
                        ["Other", "18%", "18%", "16%"]
                    ]
                })
            }
        return {
            "type": "data_table",
            "details": json.dumps({
                "title": f"Data for {section}",
                "headers": context.get("headers", []),
                "rows": context.get("rows", [])
            })
        }
    
    def create_chart_widget(self, section: str, context: Dict) -> Dict[str, Any]:
        """Create chart widget content."""
        if section == "health_inequalities":
            return {
                "type": "chart",
                "details": json.dumps({
                    "title": "Health Outcomes by Group",
                    "chartData": [
                        {"name": "Group A", "value": 85},
                        {"name": "Group B", "value": 72},
                        {"name": "Group C", "value": 68},
                        {"name": "Group D", "value": 90}
                    ]
                })
            }
        return {
            "type": "chart",
            "details": json.dumps({
                "title": f"Chart for {section}",
                "chartData": context.get("chart_data", [])
            })
        }
    
    async def get_successors(self, output: Dict[str, Any], **kwargs) -> List[Dict[str, Any]]:
        """Determine next nodes to process."""
        # After showing a widget, usually return to customer response
        return [{
            "node": "CustomerResponse",
            "input": output
        }]
