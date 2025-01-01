from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.responses import StreamingResponse
import json
import logging
import uuid
from typing import Dict, Any
import redis
from agent.executor import single_turn_agent

app = FastAPI()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Redis client for task management
redis_client = redis.Redis(
    host="xrx-redis",
    port=6379,
    decode_responses=True
)

@app.post("/run-reasoning-agent")
async def run_agent(request: Dict[str, Any]) -> StreamingResponse:
    """
    Execute the workshop facilitator agent and stream the results.
    """
    task_id = str(uuid.uuid4())
    try:
        # Set initial task status
        await redis_client.set(task_id, "running")
        
        # Extract messages and session info from request
        messages = request.get("messages", [])
        session = request.get("session", {})
        
        async def generate_response():
            try:
                # Process the request through the agent
                result = await single_turn_agent(messages)
                
                # Check if task was cancelled
                if await redis_client.get(task_id) == "cancelled":
                    logger.info(f"Task {task_id} was cancelled")
                    return
                
                # Stream the response
                yield json.dumps(result) + "\n"
                
            except Exception as e:
                logger.error(f"Error in generate_response: {str(e)}")
                yield json.dumps({"error": str(e)}) + "\n"
            finally:
                await redis_client.delete(task_id)
        
        return StreamingResponse(
            generate_response(),
            media_type="text/event-stream",
            headers={"X-Task-ID": task_id}
        )
        
    except Exception as e:
        logger.error(f"Error in run_agent: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/cancel-reasoning-agent/{task_id}")
async def cancel_agent(task_id: str):
    """
    Cancel a running workshop facilitator task.
    """
    try:
        await redis_client.set(task_id, "cancelled")
        logger.info(f"Task {task_id} set to cancelled")
        return {"detail": f"Task {task_id} cancelled"}
    except Exception as e:
        logger.error(f"Error cancelling task: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)
